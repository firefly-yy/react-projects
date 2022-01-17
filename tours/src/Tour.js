import React, { useState } from 'react'
import './Tour.css'

function Tour({ id, image, info, name, price, removeTour }) {
  const [readMore, setReadMore] = useState(false)
  return (
    <article className='single-tour'>
      <img src={image} alt='' />
      <footer className='footer'>
        <div className='tour-info'>
          <h4>{name}</h4>
          <div className='tour-price'>
            <h4>${price}</h4>
          </div>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button className='change-btn' onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
        <button className='delete-btn' onClick={() => removeTour(id)}>
          Not Interested
        </button>
      </footer>
    </article>
  )
}

export default Tour
