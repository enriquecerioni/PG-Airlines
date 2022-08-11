import React, { useContext, useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, resetPassword } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import {darkModeContext} from "../DarkModeContext"
import s from "../styles/UserProfile.module.css";
import style from "../styles/Forms.module.css";
import { Box, Modal, Button ,TextField } from '@mui/material';
import Swal from "sweetalert2";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { darkMode } = useContext(darkModeContext)

  useEffect(() => {
    dispatch(getAllUsers());
    // setInterval(() => {}, 1000);
  }, []);

  const [ emailReset, setEmailReset] = useState('')
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);

  const [ open, setOpen ] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  function handleResetPassword(e) {
    e.preventDefault()
    if(emailReset) {
      dispatch(resetPassword(emailReset))
      Swal.fire({
        icon: "success",
        title: "Check your email",
        // text: "The password is invalid or the user does not have a password.",
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#10408F',
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "Please enter an email",
        showConfirmButton: false,
        confirmButtonColor: '#10408F',
      })

    }
  }


  return (
    <>
      {currentUser !== undefined ? (
        <div className={darkMode ? s.container_dark : s.container}>
          <ProfileNav />
          <div className={darkMode ? s.infoContainer_dark : s.infoContainer}>
            <h1 className={ darkMode ? s.title_dark : s.title}>Account Information</h1>
            <span className={  darkMode ? s.text_dark : s.text}>
              Manage your account settings and other information
            </span>
            <div className={s.info}>
              <h1>Profile Information</h1>
              <h4 className={s.h4}>Email: {currentUser.email}</h4>
              <h4 className={s.h4}>Full name: {currentUser.name} </h4>
              <div>
                <br />
                <Button variant="contained" onClick={handleOpen}>
                  Change Password
                </Button>   

                <Modal open={open} onClose={handleClose}>
                    <Box className={style.modal_login}>
                      <Button color="secondary" onClick={handleClose}>X</Button>
                      <div className={style.modal_content}>
                          <h2>Please enter your email</h2>
                            <TextField 
                            focused
                            variant="standard"
                            label='Email'
                            value={emailReset} 
                            type='email' 
                            color="warning"
                            onChange={e => setEmailReset(e.target.value)}
                            />
                        <Button variant="contained" onClick={handleResetPassword}>Send request</Button>                
                      </div>
                  </Box>
                </Modal>  
              </div>            
              </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>{<Loader />}</h1>
        </div>
      )}
    </>
  );
}
