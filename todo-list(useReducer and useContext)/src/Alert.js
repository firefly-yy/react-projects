import React, { useEffect } from 'react'
import './Alert.css'

function Alert({ type, message, removeAlert, list }) {
  console.log(type)
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list])
  return <p className={`alert-${type}`}> {message}</p>
}

export default Alert
