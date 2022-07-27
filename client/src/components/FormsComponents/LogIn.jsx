import React, { useState } from 'react'
import Input from './Input'
import { ejecutar, logIn } from '../scripts/auth'
import style from '../styles/Forms.module.css'
import { useHistory } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
import GoogleIcon from '@mui/icons-material/Google';

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

function LogIn() {
  let navigate = useHistory();
  const [validForm, setValidForm] = useState(null)

  const [loading, setLoading] = useState(false);

  const [ emailLogIn, setEmailLogIn ] = useState({value:'', valid: null})
  const [ passwordLogIn, setPasswordLogIn ] = useState({value:'', valid: null})

function handleSubmit(e){
  e.preventDefault();
  setLoading(true)
  if(e.target.emailLogIn.value && e.target.passwordLogIn.value) {
    logIn(e.target.emailLogIn.value,e.target.passwordLogIn.value)
    navigate.push('/')
  } else {
    setLoading(false)
    alert('enter valid email')
  } 
}

async function handleClick(e){
  e.preventDefault()
  setLoading(true)
  await ejecutar()
  setLoading(false)
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
        name='emailLogIn' 
        type="email" 
        placeholder='Enter email'
        // error='This email is not valid'
        // regularExpression={expression.email}
        />
        
        <Input 
        state={passwordLogIn}
        setState={setPasswordLogIn}
        label='Pasword'
        id='singup-password' 
        name='passwordLogIn' 
        type="password" 
        placeholder='Enter password'
        // error='Incorrect password'
        // regularExpression={expression.password}        
        />

        {validForm === false && <span>Please complete all fields correctly</span>}

        <LoadingButton
          type='submit' 
          endIcon='✔'
          loading={loading}
          loadingPosition="end"
          variant="contained"
          >Log In</LoadingButton>

        {validForm === true && <span>Welcome back</span>}

        </form>

      <br />
      <hr className={style.separator}/>
      <br />

      <LoadingButton 
      onClick={()=>handleClick()}
      endIcon= {<GoogleIcon />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
      >Log in with Google</LoadingButton>

    </div>
  )
} 

export default LogIn