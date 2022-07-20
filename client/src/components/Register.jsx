import React from 'react'

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
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
    </div>
  )
}

export default Register