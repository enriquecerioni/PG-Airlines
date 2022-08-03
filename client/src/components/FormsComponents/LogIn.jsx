import React, { useState } from "react";
import Input from "./Input";
import { ejecutar, logIn } from "../scripts/auth";
import { Link } from "react-router-dom";
import style from "../styles/Forms.module.css";
import { useHistory } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from "sweetalert2";

function LogIn() {
  let navigate = useHistory();
  const [validForm, /*setValidForm*/] = useState(null);

  const [loading, setLoading] = useState(false);

  const [emailLogIn, setEmailLogIn] = useState({ value: "", valid: null });
  const [passwordLogIn, setPasswordLogIn] = useState({
    value: "",
    valid: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (e.target.emailLogIn.value && e.target.passwordLogIn.value) {
      let type = await logIn(
        e.target.emailLogIn.value,
        e.target.passwordLogIn.value
      );
      if (typeof type == "string") {
        // alert(type);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "The password is invalid or the user does not have a password.",
        showConfirmButton: false,
        confirmButtonColor: '#10408F',
      }); 
      } else navigate.push("/");
      setTimeout(() => {window.location.reload();}, 2500);
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
    await ejecutar();
    navigate.push("/");
    window.location.reload();
  }

  return (
    <div className={style.container}>
      <h1>Log In</h1>
      <form
        className={style.form_container}
        onSubmit={(e) => handleSubmit(e)}
        id="sing-up"
      >
        <Input
          state={emailLogIn}
          setState={setEmailLogIn}
          label="Email"
          id="singup-email"
          name="emailLogIn"
          type="email"
          placeholder="Enter email"
          // error='This email is not valid'
          // regularExpression={expression.email}
        />

        <Input
          state={passwordLogIn}
          setState={setPasswordLogIn}
          label="Pasword"
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

      {/* <div className={style.containerAirline}>
        <p>Want to partner up your airline with us?</p>
        <button><Link to='/register/airline'>Register Airline</Link></button>
      </div> */}
    </div>
  );
}

export default LogIn;
