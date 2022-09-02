import React from 'react'
import { Image, message } from 'antd';
import axios from 'axios';
import PubSub from 'pubsub-js'

const Display = (props) => {
    const { query, msg } = props.photoInfo  // get the search query and URL

    const refresh = () => { // re-request in order to get a new picture of selected breed
        axios.get(`http://localhost:3000/api/search?q=${query}`)
            .then(
                response => {
                    console.log(response.data)
                    if (response.data.status === 'error') {
                        message.error(response.data.message, 2);
                        return
                    }
                    PubSub.publish('search', { query: query, msg: response.data.message, fetched: true }) //publish search event to update the state in App
                },
                error => {
                    PubSub.publish('search', { query: query, msg: error.message, fetched: false })
                    message.error(error.message, 2);
                    console.alert(error)
                }
            )
    }

    return (
        <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
            <Image preview={{
                visible: false,
                mask: 'Click to see more'
            }} onClick={refresh} src={msg}
                height={"70vh"}
            />
        </div>

    )
}

export default Display