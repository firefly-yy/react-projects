import React, { Children } from 'react'
import './List.css'
import Thing from './Thing'
import { useGlobalContext } from './context'

function List() {
  const { list, removeItem, editItem,isEditing,dispatch } = useGlobalContext()
  console.log(list,isEditing)

  return (
    <div>
      {list.map((item) =>
        Children.toArray(
          // console.log(item.name)
          <Thing
            id={item.id}
            name={item.name}
            removeItem={removeItem}
            editItem={editItem}
          />
        )
      )}
      {list.length > 0 && (
        <button
          className='clear-btn'
          onClick={() => dispatch({ type: 'CLEAR_ALL_ITEMS' })}
        >
          clear all
        </button>
      )}
    </div>
  )
}

export default List
