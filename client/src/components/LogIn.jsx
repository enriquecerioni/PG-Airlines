import React, { useState } from 'react'
import Input from './Input'
import { ejecutar, logIn } from './scripts/auth'
import style from './styles/Forms.module.css'
import { useHistory } from "react-router-dom";


 

// function LogIn() {

//   function handleSubmit(e) {
//     e.preventDefault()
//     if(
//       emailLogIn.valid === 'true' && 
//       passwordLogIn.valid === 'true'
//     ) { 
//       setValidForm(true)
//       console.log('Enviado')
//     } else {
//       setValidForm(false)
//     }
//   }

//   return (
//     <div className={style.container}>
//       <h1>Log In</h1>
//       <form className={style.form_container} onSubmit={handleSubmit} >
//         <Input
//         state={emailLogIn}
//         setState={setEmailLogIn}
//         label='Email'
//         type='email'
//         name='emailLogIn'
//         placeholder='Enter email'
//         // error='This email is not valid'
//         // regularExpression={expression.email}
//         />

//         <Input
//         state={passwordLogIn}
//         setState={setPasswordLogIn}
//         label='Password'
//         type='password'
//         name='passwordLogIn'
//         placeholder='Enter password'
//         // error='Incorrect password'
//         // regularExpression={expression.password}
//         />


function LogIn() {
  let navigate = useHistory();
  const [validForm, setValidForm] = useState(null)

  const [ emailLogIn, setEmailLogIn ] = useState({value:'', valid: null})
  const [ passwordLogIn, setPasswordLogIn ] = useState({value:'', valid: null})

function handleSubmit(e){
  e.preventDefault();
  logIn(e.target.email.value,e.target.password.value)
}

 async function handleClick(){
  await ejecutar()
  navigate.goBack();
}
  return (
    <div className={style.container}>
      <h1>Log In</h1>
      <form className={style.form_container}  onSubmit={(e)=>handleSubmit(e)} id="sing-up">
        <Input 
        state={emailLogIn}
        setState={setEmailLogIn}
        label='Email'
        id='singup-email' 
        name='email' 
        type="text" 
        placeholder='Enter email'
        />
        
        <Input 
        state={passwordLogIn}
        setState={setPasswordLogIn}
        label='Pasword'
        id='singup-password' 
        name='password' 
        type="password" 
        placeholder='Enter password'
        />

        {validForm === false && <span>Please complete all fields correctly</span>}

        <button type='submit'>Log In</button>

        {validForm === true && <span>Welcome back</span>}

        </form>


      <button onClick={()=>handleClick()}>
        Log in with Google
      </button>
    </div>
  )
} 

export default LogIn