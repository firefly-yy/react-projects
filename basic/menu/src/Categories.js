import React from 'react'
import './Categories.css'

function Categories({ categories, filterItems }) {
  return (
    <div className="btn">
      {categories.map((category, index) => {
        return (
          <button
            type='button'
            className='filter-btn'
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default Categories
