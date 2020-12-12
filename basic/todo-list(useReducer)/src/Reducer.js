export const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newList = [...state.list, action.payload]
    return {
      ...state,
      list: newList,
      alert: {
        show: true,
        type: 'success',
        message: 'item added to the list',
      },
    }
  }
  if (action.type === 'EDIT_ITEM') {
    return {
      ...state,
      isEditing: true,
      editId: action.payload,
    }
  }

  if (action.type === 'CHANGE_ITEM') {
    const newList = state.list.map((item) => {
      if (item.id === state.editId) {
        return { ...item, name: action.payload }
      }
      return item
    })
    console.log(newList)
    return {
      ...state,
      list: newList,
      isEditing: false,
      editId: null,
      alert: {
        show: true,
        type: 'success',
        message: 'value changed',
      },
    }
  }
  if (action.type === 'REMOVE_ITEM') {
    const newList = state.list.filter((item) => item.id !== action.payload)
    return {
      ...state,
      list: newList,
      alert: {
        show: true,
        type: 'danger',
        message: 'item removed from the list',
      },
    }
  }

  if (action.type === 'SHOW_ALERT') {
    return {
      ...state,
      alert: action.payload,
    }
  }

  if (action.type === 'REMOVE_ALERT') {
    return {
      ...state,
      alert: action.payload,
    }
  }

  if(action.type ==='CLEAR_ALL_ITEMS') {
   return {
    ...state,
    list: [],
    alert: {
     show:true,
     type:'danger',
     message: 'empty the list'
    }
   }
  }

  throw new Error('no matching action type')
}
