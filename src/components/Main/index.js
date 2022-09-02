import React from 'react'
import { SearchBar } from '../../components/SearchBar'
import logo from './Logo.svg'
import './index.css'

const Home = (props) => {

    const { fetched } = props   // if picture fetched, change the layout
    return (
        <div className='Home' style={fetched ? { flex: 1 } : {}}>
            <img className='Logo' alt="logo" src={logo} style={fetched ? { maxHeight: '8vh' } : { maxWidth: '80vw', maxHeight: '20vh' }} />
            <SearchBar className='SearchBar' {...props}
                style={fetched ? { top: '10px' } : { top: '5%' }}
            />
        </div>
    )
}

export default Home