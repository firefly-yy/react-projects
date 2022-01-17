import React, { useState } from 'react'
import Menu from './Menu'
import './App.css'
import items from './data'
import Categories from './Categories'

const allCategories = ['all', ...new Set(items.map((item) => item.category))]
function App() {
  const [menuItems, setMenuItems] = useState(items)
  const [categories, setCategories] = useState(allCategories)
  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items)
    } else {
      const newMenuItems = items.filter((item) => item.category === category)
      setMenuItems(newMenuItems)
    }
  }
  return (
    <div className='app'>
      <div className='title'>
        <h2>Our Menu</h2>
        <div className='underline'></div>
      </div>
      <div className='btn-container'>
        <Categories categories={categories} filterItems={filterItems} />
      </div>
      <div className="menus">
        <Menu items={menuItems} />
      </div>
    </div>
  )
}

export default App
