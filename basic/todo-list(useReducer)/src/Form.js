import React, { Children, useState } from 'react'
import './Form.css'

function Form() {
  // const [firstName, setFirstName] = useState('')
  // const [email, setEmail] = useState('')
  const [person, setPerson] = useState({
    firstName: '',
    email: '',
  })
  const [people, setPeople] = useState([])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    ///////////////////////////////////////////////////////////////////////////////////
    setPerson({ ...person, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // if (firstName && email) {
    //   const person = { id: new Date().getTime().toString(), firstName, email }
    //   console.log(person)
    //   setPeople((people) => {
    //     return [...people, person]
    //   })
    //   setFirstName('')
    //   setEmail('')
    //   console.log(people)
    // } else {
    //   console.log('empty values')
    // }
    if (person.firstName && person.email) {
      const newPerson = { ...person, id: new Date().getTime().toString() }
      setPeople([...people, newPerson])
      setPerson({ firstName: '', email: '' })
    }
  }
  return (
    <div>
      <form className='form'>
        <label htmlFor='firstName'>Name : </label>
        <input
          className='firstName'
          id='firstName'
          name='firstName'
          //value 和 onChange 在input中一起使用
          value={person.firstName}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email : </label>
        <input
          className='email'
          id='email'
          name='email'
          value={person.email}
          onChange={handleChange}
        />
        <button type='submit' onClick={handleSubmit}>
          add person
        </button>
      </form>
      {people.map((person) => {
        const { id, firstName, email } = person
        // 一定要用return 来返回html
        return (
          <div className='item' key={id}>
            <h4>{firstName}</h4>
            <h4>{email}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Form
