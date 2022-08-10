import React, { useContext, useState } from "react";
import Input from "./Input";
import { ejecutar, logIn } from "../scripts/auth";
import { Link } from "react-router-dom";
import style from "../styles/Forms.module.css";
import { useHistory } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Modal, Button,TextField } from '@mui/material';
import Swal from "sweetalert2";
import { resetPassword } from '../../redux/actions/index'
import { useDispatch } from "react-redux";
import { darkModeContext } from "../DarkModeContext";

function LogIn() {
  let navigate = useHistory();
  const dispatch = useDispatch();
  const { darkMode } = useContext(darkModeContext);
  const [validForm, /*setValidForm*/] = useState(null);

  const [loading, setLoading] = useState(false);
  const [emailLogIn, setEmailLogIn] = useState({ value: "", valid: null });
  const [passwordLogIn, setPasswordLogIn] = useState({
    value: "",
    valid: null,
  });

  const [ emailReset, setEmailReset] = useState('')

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (e.target.emailLogIn.value && e.target.passwordLogIn.value) {

      let type = await logIn(
        e.target.emailLogIn.value,
        e.target.passwordLogIn.value
      )

      if (typeof type == "string") {

      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "The password is invalid or the user does not have a password.",
        showConfirmButton: false,
        confirmButtonColor: '#10408F',
      })

      } else {
        navigate.push("/");
        setTimeout(() => {window.location.reload();}, 2500);
      } 
      
    } else {
      setLoading(false);
      // alert('enter valid email')
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "Enter valid email",
        confirmButtonColor: '#10408F'
      });
    }
  }

  async function handleClick(e) {
    await  ejecutar()
   navigate.push("/")
    window.location.reload()
  }

  const [ open, setOpen ] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={darkMode ?  style.todo_dark : style.todo}>
      <div className={darkMode ? style.container_dark : style.container}>
        <h1 className={darkMode ? style.letra_dark : style.letra}>Log In</h1>
        
        <form
          className={darkMode ? style.form_container_dark : style.form_container}
          onSubmit={(e) => handleSubmit(e)}
          id="sing-up"
        >
          <label  className={darkMode ? style.letra1_dark : style.letra1} >
            EMAIL
          </label>
          <Input
            state={emailLogIn}
            setState={setEmailLogIn}
            // label="Email"
            id="singup-email"
            name="emailLogIn"
            type="email"
            placeholder="Enter email"
            // error='This email is not valid'
            // regularExpression={expression.email}
          />
          <label  className={darkMode ? style.letra1_dark : style.letra1} >
            PASWORD
          </label>
          <Input
            state={passwordLogIn}
            setState={setPasswordLogIn}
            // label="Pasword"
            id="singup-password"
            name="passwordLogIn"
            type="password"
            placeholder="Enter password"
            // error='Incorrect password'
            // regularExpression={expression.password}
          />

          {validForm === false && (
            <span>Please complete all fields correctly</span>
          )}
          <LoadingButton
            type="submit"
            endIcon="✔"
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Log In
          </LoadingButton>

          {validForm === true && <span>Welcome back</span>}
        </form>

        {/* <br />
        <hr className={style.separator} />
        <br />

        <LoadingButton
          onClick={() => handleClick()}
          endIcon={<GoogleIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Log in with Google
        </LoadingButton>


        {validForm === true && <span>Welcome back</span>}
      </form> */}

      <br />
      <hr className={style.separator} />
      <br />

      <LoadingButton
        onClick={() => handleClick()}
        endIcon={<GoogleIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Log in with Google
      </LoadingButton>

      <p>
        <Link className={style.sing} to="/register">
          Don't have an account? Sing Up
        </Link>
      </p>

      <div>
        <Button onClick={handleOpen}>
          Forgot your password?
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
  );
}

export default LogIn;
