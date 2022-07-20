import React from 'react'

function LogIn() {
  return (
    <div>
      <h1>Log In</h1>
      <form>
        <label>Email</label>
        <input name='email' type="text" />
        
        <label>Password</label>
        <input name='password' type="password" />

        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default LogIn