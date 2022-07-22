import React, { useState } from 'react'
import Input from './Input.jsx'
import style from './styles/Forms.module.css'

function LogIn() {
  const [validForm, setValidForm] = useState(null)

  const [ emailLogIn, setEmailLogIn ] = useState({value:'', valid: null})
  const [ passwordLogIn, setPasswordLogIn ] = useState({value:'', valid: null})

  function handleSubmit(e) {
    e.preventDefault()
    if(
      emailLogIn.valid === 'true' && 
      passwordLogIn.valid === 'true'
    ) { 
      setValidForm(true)
      console.log('Enviado')
    } else {
      setValidForm(false)
    }
  }

  return (
    <div className={style.container}>
      <h1>Log In</h1>
      <form className={style.form_container} onSubmit={handleSubmit} >
        <Input
        state={emailLogIn}
        setState={setEmailLogIn}
        label='Email'
        type='email'
        name='emailLogIn'
        placeholder='Enter email'
        // error='This email is not valid'
        // regularExpression={expression.email}
        />

        <Input
        state={passwordLogIn}
        setState={setPasswordLogIn}
        label='Password'
        type='password'
        name='passwordLogIn'
        placeholder='Enter password'
        // error='Incorrect password'
        // regularExpression={expression.password}
        />

        {validForm === false && <span>Please complete all fields correctly</span>}

        <button type='submit'>Log In</button>

        {validForm === true && <span>Welcome back</span>}

      </form>
    </div>
  )
}

export default LogIn