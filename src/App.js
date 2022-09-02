import React, { useState, useEffect } from 'react'
import './App.css';
import Display from './components/Display';
import Main from './components/Main';
import PubSub from 'pubsub-js'
import axios from 'axios'

function App() {
  const [photoInfo, setPhotoInfo] = useState({ query: '', msg: '', fetched: false })  // photo info for display
  const [breedList, setBreedList] = useState([])  // breeds list

  useEffect(() => {
    // subscribe the search event to update the state
    PubSub.subscribe('search', (_, stateObj) => {
      setPhotoInfo(stateObj)
    })
  });

  useEffect(() => {
    // load the breed list for automatic matching keywords
    axios.get('http://localhost:3000/api/load')
      .then(
        response => {
          if (response.data.status === 'success') {
            let breeds = [{ value: 'random' }]  // add the random option
            Object.keys(response.data.message).forEach((element) => breeds.push({ value: element }))
            setBreedList(breeds)
            // console.log(breeds)
          }
          else { console.log('ERROR', response.data.message) }
        },
        error => {
          console.log(error)
        }
      )
  }, [])

  return (
    <div className="App">
      <Main className="Main" {...photoInfo} breeds={breedList} />
      <div className="Display" style={photoInfo.fetched ? { flex: 5 } : { flex: 1 }}>
        {
          photoInfo.fetched ? <Display photoInfo={photoInfo} /> : <span></span>
        }
      </div>
    </div >
  );
}

export default App;
