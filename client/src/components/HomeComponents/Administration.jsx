import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFirebase,crearAerolinea,deleteAirline } from "../../redux/actions";

import { Delete, makeAdmin } from "../scripts/auth";


export default function Administration(){
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllUsersFirebase())
    },[])
   const allUser=useSelector(state=>state.allUsersFirebase)
    const user=allUser.filter((user)=>!user.hasOwnProperty("empresa") && !user.admin)
    const business=allUser.filter((user)=>user.hasOwnProperty("empresa") && user.empresa)
   const toBeBusiness=allUser.filter((user)=>user.hasOwnProperty("empresa") && !user.empresa)
// business.map((u)=>console.log("empresas" ,u
//     ))
    // console.log(user);
    // console.log(business);
    // console.log(toBeBusiness);
   async function handleSubmit(e){
    e.preventDefault()
    //console.log(e.target.email.value);
    let email=e.target.email.value
    await makeAdmin(email)
     dispatch(crearAerolinea({email}))
   // window.location.reload()
   }

   async function handleSubmit2(e){
    e.preventDefault()
    let email=e.target.email.value
    let uid=e.target.uid.value
    await Delete(email,uid)
     dispatch(deleteAirline(email))
   //  aca va un loader porque las funciones se ejecutan tarde y se rompe con el window.location.reload()
    
   }
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>USUARIOS</h2>
            
        { user.length ? 
            user.map(u => {
              return (
                <div>
                    <br/>
                    <br/>
                    <div key={u.uid}>email: {u.email},Name: {u.name ? u.name :null}, uid: {u.uid}</div>
                </div>
                
              )      
            }) : <h1>Not users by now</h1>
        }
        <br/>
        <br/>
        <br/>
        <h2>Business in confirm</h2>
        {
            toBeBusiness.length ?
            toBeBusiness.map((u)=>{
                return (
                    <div>
                        <br/>
                        <br/>
                        <div key={u.uid}>email: {u.email},Name: {u.name ? u.name :null}, uid: {u.uid}</div>
                    </div>
                    
                  )      
                }) : <h1>Not business by now</h1>
            
        }
        <br/>
        <br/>
        <br/>
        <h2>Business</h2>
        {
            business.length ?
            business.map((u)=>{
                return (
                    <div>
                        <br/>
                        <br/>
                        <div key={u.uid}>email: {u.email},Name: {u.name ? u.name :null}, uid: {u.uid}</div>
                    </div>
                    
                  )      
                }) : <h1>Not business by now</h1>
            
            
        }
        <div>
            <br/>
            <label>Make admin:</label>
            <form onSubmit={((e)=>handleSubmit(e))}>
            <input 
            type='text'
            label='email'
            placeholder='email'
            name='email'
            />
           
            <button type="submit">Sumbit</button>
            </form>
            

        </div>
        <div>
            <br/>
            <label>delete user :</label>
            <form onSubmit={((e)=>handleSubmit2(e))}>
            <input 
            type='text'
            label='email'
            placeholder='email'
            name='email'
            />
            <input 
            type='text'
            label='uid'
            placeholder='uid'
            name='uid'
            />
           
            <button type="submit">Sumbit</button>
            </form>

        </div>
        </div>
    )

}
   
{/*  */}