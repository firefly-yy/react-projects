import { EnhancedEncryptionTwoTone } from '@material-ui/icons'
import React, { useState, useEffect, useRef, useReducer } from 'react'
import Alert from './Alert'
import './App.css'
// import Form from "./Form"
import List from './List'
import { reducer } from './Reducer'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(list))
  } else {
    return []
  }
}
const initialState = {
  list: getLocalStorage(),
  isEditing: false,
  editId: null,
  alert: {
    show: false,
    type: '',
    message: '',
  },
}
function App() {
  const [thing, setThing] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const refContainer = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(refContainer.current.value)
    if (!thing) {
      const noValueAlert = {
        show: true,
        type: 'danger',
        message: 'please enter value',
      }
      dispatch({ type: 'SHOW_ALERT', payload: noValueAlert })
    } else if (thing && state.isEditing) {
      dispatch({ type: 'CHANGE_ITEM', payload: thing })
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: thing,
      }
      dispatch({ type: 'ADD_ITEM', payload: newItem })
      setThing('')
    }
  }

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const editItem = (itemId) => {
    const specificItem = state.list.find((item) => item.id === itemId)
    setThing(specificItem.name)
    refContainer.current.focus()
    dispatch({ type: 'EDIT_ITEM', payload: itemId })
  }

  const showAlert = () => {
    const emptyMessage = {
      show: false,
      type: '',
      message: '',
    }
    dispatch({ type: 'REMOVE_ALERT', payload: emptyMessage })
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list))
    refContainer.current.focus()
  }, [state.list])

  return (
    <div className='app'>
      {/* <Form /> */}
      <div className='container'>
        {state.alert.show && (
          <Alert {...state.alert} removeAlert={showAlert} list={state.list} />
        )}
        <div className='title'>
          <h3>need to do today</h3>
        </div>
        <form className='form'>
          <input
            className='thing'
            placeholder='want to do'
            value={thing}
            onChange={(e) => setThing(e.target.value)}
            ref={refContainer}
          />
          <button type='submit' className='btn-control' onClick={handleSubmit}>
            {state.isEditing ? 'edit' : 'submit'}
          </button>
        </form>
      </div>
      {state.list.map((item) => {
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
      {state.list.length > 0 && (
        <button className='clear-btn' onClick={() => dispatch({type:'CLEAR_ALL_ITEMS'})}>
          clear all
        </button>
      )}
    </div>
  )
}

export default App
