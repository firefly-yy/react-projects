import React, { useEffect, useReducer, useContext, useRef } from 'react'
import { reducer } from './Reducer'

const AppContext = React.createContext()

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(list))
  } else {
    return []
  }
}
export const AppProvider = ({ children }) => {
  const ref = useRef(null)
  const initialState = {
    list: getLocalStorage(),
    isEditing: false,
    editId: null,
    alert: {
      show: false,
      type: '',
      message: '',
    },
    refContainer: ref,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }
  const editItem = (itemId) => {
    state.editId = itemId
    state.isEditing = true
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
  }, [state.list])

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, removeItem, editItem, showAlert }}
    >
      {children}
    </AppContext.Provider>
  )
}

// to use
export const useGlobalContext = () => {
  return useContext(AppContext)
}
