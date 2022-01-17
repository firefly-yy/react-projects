import React, { useState } from 'react'
import './App.css'
import List from './List'
import { data } from './data'
function App() {
  const [people, setPeople] = useState(data)

  return (
    <div className='app'>
      <div className='container'>
        <h2>{people.length} important people</h2>
        <List people={people} />
        <button onClick={() => setPeople([])}>Clear All</button>
      </div>
    </div>
  )
}

export default App
