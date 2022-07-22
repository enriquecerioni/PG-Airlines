import React from 'react'

function LogIn() {

  return (
    <div>
      <h1>Log In</h1>
      <form id="sing-up">
        <label>Email</label>
        <input id='singup-email' name='email' type="text" />
        
        <label>Password</label>
        <input id='singup-password' name='password' type="password" />

        <button type='submit'  >Log In</button>
      </form>
    </div>
  )
}

export default LogIn
// 