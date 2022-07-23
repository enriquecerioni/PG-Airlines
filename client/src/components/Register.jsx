import React from 'react'
import { useState } from 'react'
import style from './styles/Forms.module.css'
import Input from './Input'

function Register() {
  
  const [validForm, setValidForm] = useState(null)

  const [ name, setName ] = useState({value:'', valid: null})
  const [ surname, setSurname ] = useState({value:'', valid: null})
  const [ phone, setPhone ] = useState({value:'', valid: null})
  const [ email, setEmail ] = useState({value:'', valid: null})
  const [ password, setPassword ] = useState({value:'', valid: null})
  const [ password2, setPassword2 ] = useState({value:'', valid: null})

  function handleSubmit(e) {
    e.preventDefault()
    if(
      name.valid === 'true' && 
      surname.valid === 'true' && 
      phone.valid === 'true' && 
      email.valid === 'true' &&
      password.valid === 'true'
    ) { 
      setValidForm(true)
      console.log('Enviado')
    } else {
      setValidForm(false)
    }
  }

  const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    surname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //eslint-disable-line
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, //eslint-disable-line
    password: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,12}$/, //eslint-disable-line
    // 8-12 caracteres, un simbolo especial, al menos un digito, al menos una letra en minuscula y al menos una letra en mayuscula
  }

  return (
    <div className={style.container}>
      <form className={style.form_container} onSubmit={handleSubmit} >
      <h1>Register</h1>

      <Input
        state={name}
        setState={setName}
        type='text'
        label='First Name'
        placeholder='First Name'
        name='name'
        error='Your first name cannot contain numbers or special characters'
        regularExpression={expression.name}
        />

      <Input
        state={surname}
        setState={setSurname}
        name='surname' 
        type="text" 
        label='Last Name'
        placeholder='Last Name'
        error='Your last name cannot contain numbers or special characters'
        regularExpression={expression.surname}
        />

      <Input
        state={email}
        setState={setEmail}
        name='email' 
        type="email" 
        label='E-mail'
        placeholder='E-mail'
        error='Please enter a valid email'
        regularExpression={expression.email}
        />

      <Input
        state={phone}
        setState={setPhone}
        name='phone' 
        type="number" 
        label='Phone'
        placeholder='Phone'
        error='Please enter a valid phone number'
        regularExpression={expression.phone}
        />

      <Input
        state={password}
        setState={setPassword}
        name='password' 
        type="password"
        label='Password'
        placeholder='Password'
        error='Your passwords needs 8-12 characters, one special symbol, one number, at least one lowercase letter and at least one uppercase letter'
        regularExpression={expression.password}
        />

      <Input
        state={password2}
        setState={setPassword2}
        name='confirm-password' 
        type="password" 
        label='Confirm password'
        placeholder='Confirm password'
        />
        {password2.value !== password.value && <span>Password does not match</span>}

        {validForm === false && <span>Please complete all fields correctly</span>}
        <button type='submit'>Register</button>
        {validForm === true && <span>Thank you!</span>}

      </form>
    </div>
  )
}

export default Register