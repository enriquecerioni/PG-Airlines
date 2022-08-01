import React from "react";
import { useSelector } from "react-redux";

import { Delete, makeAdmin } from "../scripts/auth";


export default function Administration(){
   const user=useSelector(state=>state.allUsers)

   async function handleSubmit(e){
    e.preventDefault()
    //console.log(e.target.email.value);
    await makeAdmin(e.target.email.value)
   // window.location.reload()
   }

   async function handleSubmit2(e){
    e.preventDefault()
    await Delete(e.target.email.value,e.target.uid.value)
   // window.location.reload()
   }
    return (
        <div>
        { user.length ? 
            user.map(u => {
              return (
                <div>
                    <br/>
                    <br/>
                    <div key={u.uid}>email: {u.email},Name: {u.name ? u.name :null}, uid: {u.uid}</div>
                </div>
                
              )      
            }) : <h1>null</h1>
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