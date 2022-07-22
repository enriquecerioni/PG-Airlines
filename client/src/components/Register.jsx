import React from 'react'
import { ejecutar, singUp } from './scripts/auth'

function Register() {
  function handleSubmit(e){
    e.preventDefault()
    singUp(e.target.email.value,e.target.password.value)
    console.log("ta?")
  }
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>



      <h1>Register</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>E-mail</label>
        <input name='email' type="email" />

        <label>Password</label>
        <input name='password' type="password" />

        <label>Confirm password</label>
        <input name='confirm-password' type="password" />

        <label>First Name</label>
        <input name='first-name' type="text" />

        <label>Last Name</label>
        <input name='last-name' type="text" />

        <button type='submit'>Register</button>
      </form>
      <button onClick={()=>ejecutar()}>Register by Google</button>
    </div>
  )
}

export default Register