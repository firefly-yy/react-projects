import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import './App.css'
// import Form from "./Form"
import List from './List'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(list))
  } else {
    return []
  }
}
function App() {
  const [thing, setThing] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  //list is an object, it includes id and name!!!
  const [list, setList] = useState(getLocalStorage())
  const [alert, setAlert] = useState({ show: false, massage: '', type: '' })
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!thing) {
      showAlert(true, 'danger', 'please enter value')
    } else if (thing && isEditing) {
      setList(
        list.map((item) => {
          // change thing content by editing
          if (item.id === editId) {
            return { ...item, name: thing }
          }
          //1.list 是个对象，
          //2. map是个遍历的过程  所以一定要返回原来的数据，item 即不产生任何改变。
          return item
        })
      )
      showAlert(true, 'success', 'value changed')
      setEditId(null)
      setThing('')
      setIsEditing(false)
    } else {
      // add thing
      console.log(thing)
      const newItem = { id: new Date().getTime().toString(), name: thing }
      setList([...list, newItem])
      setThing('')
      showAlert(true, 'success', 'item added to the list')
      console.log(list)
    }
  }

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message })
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setEditId(specificItem.id)
    setIsEditing(true)
    setThing(specificItem.name)
    console.log(id)
  }
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
  }

  const clearItem = () => {
    setList([])
    showAlert(true, 'danger', 'empty list')
    setIsEditing(false)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <div className='app'>
      {/* <Form /> */}
      <div className='container'>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className='title'>
          <h3>need to do today</h3>
        </div>
        <form className='form'>
          <input
            className='thing'
            placeholder='want to do'
            value={thing}
            onChange={(e) => setThing(e.target.value)}
          />
          <button type='submit' className='btn-control' onClick={handleSubmit}>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </form>
      </div>

      {list.map((item) => {
        const { name, id } = item
        return (
          <div key={id}>
            <List
              name={name}
              removeItem={removeItem}
              id={id}
              editItem={editItem}
            />
          </div>
        )
      })}
      {list.length > 0 && (
        <button className='clear-btn' onClick={() => clearItem()}>
          clear all
        </button>
      )}
    </div>
  )
}

export default App
