import React from 'react'
import { ejecutar, logIn } from './scripts/auth'

function LogIn() {
function handleSubmit(e){
  e.preventDefault();
  logIn(e.target.email.value,e.target.password.value)
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
      
      <h1>Log In</h1>
      <form onSubmit={(e)=>handleSubmit(e)} id="sing-up">
        <label>Email</label>
        <input id='singup-email' name='email' type="text" />
        
        <label>Password</label>
        <input id='singup-password' name='password' type="password" />

        <button type='submit'  >Log In</button>
      </form>
      <button onClick={()=>ejecutar()}>
        Log in with Google
      </button>
    </div>
  )
}

export default LogIn
// 