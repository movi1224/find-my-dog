import React, { useState } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
import { AutoComplete, Input, message } from 'antd';
const { Search } = Input;


export const SearchBar = (props) => {
    const [open, setOpen] = useState(false);    // param to control the auto-complete dragdown 
    const { query, breeds } = props
    const search = (searchContent) => {
        searchContent = searchContent.toLowerCase()
        if (searchContent.trim() === '') {  // if the input is blank, display a random picture
            message.warning('No inputs detected, please enjoy a random puppy', 1.5);
        }
        axios.get(`http://localhost:3000/api/search?q=${searchContent}`)
            .then(
                response => {
                    if (response.data.status === 'error') {
                        message.error(response.data.message, 2);
                        return
                    }
                    PubSub.publish('search', { query: searchContent, msg: response.data.message, fetched: true }) //publish search event to update the state in App
                },
                error => {
                    PubSub.publish('search', { query: searchContent, msg: error.message, fetched: false })
                    message.error(error.message, 2);
                    console.log('ERROR', error)
                }
            )
    }


    return (
        <div className='SearchBar'>
            <AutoComplete
                options={breeds}  // load all breeds for auto-complete
                onBlur={() => setOpen(false)}
                open={open}
                backfill={true}
                onSelect={() => setOpen(false)}
                onSearch={() => setOpen(true)}
                filterOption={(inputValue, option) => option.value.indexOf(inputValue) !== -1}
                notFoundContent={<span>Sorry, we don't have this breed on file now :(</span>} // error handling
            >
                <Search placeholder={query ? query : "Input a breed to search"} onSearch={search} enterButton style={{ width: '50vw' }} />
            </AutoComplete>
        </div>
    )
}
