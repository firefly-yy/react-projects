import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from './context'
import './Form.css'
import Alert from './Alert'

function Form() {
  const [thing, setThing] = useState('')
  const { dispatch, isEditing, list, alert, showAlert,refContainer } = useGlobalContext()
  // const refContainer = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!thing) {
      const noValueAlert = {
        show: true,
        type: 'danger',
        message: 'please enter value',
      }
      // console.log('hello')
      dispatch({ type: 'SHOW_ALERT', payload: noValueAlert })
    } else if (thing && isEditing) {
      dispatch({ type: 'CHANGE_ITEM', payload: thing })
      setThing('')
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: thing,
      }
      dispatch({ type: 'ADD_ITEM', payload: newItem })
      setThing('')
    }
  }
  useEffect(() => {
    refContainer.current.focus()
  }, [list])

  return (
    <div>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <p>need to do today!</p>
      <form className='form'>
        <input
          placeholder='want to do'
          value={thing}
          onChange={(e) => setThing(e.target.value)}
          ref={refContainer}
        />
        <button type='submit' className='btn-control' onClick={handleSubmit}>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </form>
    </div>
  )
}

export default Form
