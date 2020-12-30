import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95vw',
    maxWidth: '35rem',
    marginTop: '1.5rem',
    letterSpacing: '1px',
    height: '25px',
    textTransform: 'capitalize',
  },
}))
function Thing({ name, id,editItem,removeItem }) {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.root}>
        <h4 className='thing'>{name}</h4>
        <div className='button-container'>
          <Button
            variant='text'
            color='primary'
            size='small'
            onClick={() => editItem(id)}
          >
            <EditIcon fontSize='small' />
          </Button>
          <Button variant='text' color='default' onClick={() => removeItem(id)}>
            <HighlightOffIcon fontSize='small' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Thing
