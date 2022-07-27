import React from 'react'
import { useState } from 'react'
import style from '../styles/Forms.module.css'
import Input from './Input'
import { ejecutar, singUp } from '../scripts/auth'
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

export default function RegisterAirline() {

  const [validForm, setValidForm] = useState(null)
  const navigate = useHistory();
  const error = useSelector(state => state.error)

  const [ name, setName ] = useState({value:'', valid: null})
  const [ image, setImage ] = useState({value:'', valid: null})
  const [ phone, setPhone ] = useState({value:'', valid: null})
  const [ email, setEmail ] = useState({value:'', valid: null})

    const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //eslint-disable-line
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, //eslint-disable-line
    image: /\.(jpe?g|png|gif|bmp)$/i,
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character (*)
  }

  function handleSubmit(e){
    e.preventDefault()
    // if(e.target.email.value && e.target.password.value) {
    //   alert('Ya te regisrtaste, anda a Log In')
    //   navigate.replace('/login')
    // } else {
    //   singUp(e.target.email.value, e.target.password.value)
    // }
    singUp(e.target.email.value,e.target.password.value)
    navigate.goBack()
  }
  async function handleClick (e){
    try {
      singUp(e.target.email.value, e.target.password.value)
    } catch (error) {
      alert('Usuario ya registrado')
    }
    
  }

  async function handleClick (){
    try {
      await ejecutar();
      navigate.replace('/'); //asyn await
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={style.container}>

      <form onSubmit={(e)=>handleSubmit(e)} className={style.form_container}>
      <h1>Add your Airline ✈️</h1>

      <Input
        state={name}
        setState={setName}
        type='text'
        label='Airline Name'
        placeholder='Airline Name'
        name='name'
        error='Your first name cannot contain numbers or special characters'
        regularExpression={expression.name}
        />

        {/* Con la misma lógica de que la empresa debe tener su número propio, debería tener su email propio */}
       <Input
        state={image}
        setState={setImage}
        name='image' 
        type="file" 
        label='Image'
        placeholder='image'
        error='Please provide an image for your airline'
        regularExpression={expression.image}
        />

       <Input
        state={email}
        setState={setEmail}
        name='email' 
        type="email" 
        label='email'
        placeholder='E-mail'
        error='Please enter a valid email'
        regularExpression={expression.email}
       />

      <Input
        state={phone}
        setState={setPhone}
        name='phone' 
        type="number" 
        label='Airline Phone'
        placeholder='Phone'
        error='Please enter a valid phone number'
        regularExpression={expression.phone}
        />

        {validForm === false && <span>Please complete all fields correctly</span>}

        <Button type='submit' variant="contained">Register Airline</Button>

        {validForm === true && <span>Thank you!</span>}

      </form>
    </div>
  )
}