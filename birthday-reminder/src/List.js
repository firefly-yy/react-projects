import React from 'react'
import './List.css'
import { Avatar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}))

function List({ people }) {
  const classes = useStyles()
  return (
    <div className='list'>
      {people.map((person) => {
        const { id, name, birthday, image } = person
        return (
          <div className='box' key={id}>
            <Avatar src={image} alt='' className={classes.large} />
            <div className='info'>
              <h4>{name}</h4>
              <p>{birthday}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List
