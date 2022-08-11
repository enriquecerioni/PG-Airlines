import React, { useContext } from "react";
import { useState } from "react";
import style from "../styles/Forms.module.css";
import Input from "./Input";
import { ejecutar, singUp } from "../scripts/auth";
import { useHistory } from "react-router-dom";
// import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { darkModeContext } from "../DarkModeContext";


function Register() {
  const { darkMode } = useContext(darkModeContext);
  const [validForm, /*setValidForm*/] = useState(null);
  const navigate = useHistory();
  const error = useSelector((state) => state.error);

  const [name, setName] = useState({ value: "", valid: null });
  const [surname, setSurname] = useState({ value: "", valid: null });
  const [phone, setPhone] = useState({ value: "", valid: null });
  const [email, setEmail] = useState({ value: "", valid: null });
  const [password, setPassword] = useState({ value: "", valid: null });
  const [password2, setPassword2] = useState({ value: "", valid: null });
  const [image, setImage] = useState({ value: "", valid: null });

  const [loading, setLoading] = useState(false);

  const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    surname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //eslint-disable-line
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, //eslint-disable-line
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character (*),
    image: /^(ftp|http|https):\/\/[^ "]+$/,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if(
      name.valid === 'true' &&
      image.valid === 'true' &&
      surname.valid === 'true' &&
      email.valid === 'true' &&
      phone.valid === 'true' &&
      password.valid === 'true' &&
      password2.value === password.value 
    ) 
    {
      let type = await singUp(
        e.target.email.value,
        e.target.password.value,
        e.target.phone.value, 
        e.target.image.value,
        `${e.target.name.value} ${e.target.surname.value}`
      );

    if (typeof type == "string") {
      // alert(type)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#10408F",
      });
      setLoading(false);
    } else {
      navigate.push("/");
      //window.location.reload();
    }
  }else{
    Swal.fire({
      icon: "question",
      title: "Oops...",
      text: "Complete all fields",
      confirmButtonColor: "#10408F",
    });
    setLoading(false);
  }
}

  async function handleClick(e) {
    try {
      e.preventDefault();
      setLoading(true);
      await ejecutar();
      setLoading(false);

      navigate.replace("/");
      window.location.reload();
      //asyn await
    } catch (error) {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#10408F",
      });
    }
  }

  return (
    <div className={darkMode ?  style.todo_dark : style.todo}>
      <div className={darkMode ? style.containerRegister_dark : style.containerRegister}>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form_container_register}>
          <h1 className={darkMode ? style.letra_dark : style.letra}>Create your account</h1>


          <label  className={darkMode ? style.letra3_dark : style.letra3} >
            First Name
          </label>
          <Input
            state={name}
            setState={setName}
            type="text"
            // label="First Name"
            placeholder="First Name"
            name="name"
            error="Your first name cannot contain numbers or special characters"
            regularExpression={expression.name}
          />

           <label  className={darkMode ? style.letra3_dark : style.letra3} >
            Last Name
          </label>
          <Input
            state={surname}
            setState={setSurname}
            name="surname"
            type="text"
            // label="Last Name"
            placeholder="Last Name"
            error="Your last name cannot contain numbers or special characters"
            regularExpression={expression.surname}
          />

          <Input
            state={image}
            setState={setImage}
            name="image"
            type="text"
            label="Image"
            placeholder="Image URL"
            error="Please provide an image"
            regularExpression={expression.image}
          />
            <label  className={darkMode ? style.letra3_dark : style.letra3} >
            E-mail
            </label>
          <Input
            state={email}
            setState={setEmail}
            name="email"
            type="email"
            // label="E-mail"
            placeholder="E-mail"
            error="Please enter a valid email"
            regularExpression={expression.email}
          />
           <label  className={darkMode ? style.letra3_dark : style.letra3} >
           Phone
            </label>
          <Input
            state={phone}
            setState={setPhone}
            name="phone"
            type="number"
            // label="Phone"
            placeholder="Phone"
            error="Please enter a valid phone number"
            regularExpression={expression.phone}
          />
            <label  className={darkMode ? style.letra3_dark : style.letra3} >
            Password
            </label>

          <Input
            state={password}
            setState={setPassword}
            name="password"
            type="password"
            // label="Password"
            placeholder="Password"
            error="Your passwords needs 8-12 characters, one special symbol, one number, at least one lowercase letter and at least one uppercase letter"
            regularExpression={expression.password}
          />
            <label  className={darkMode ? style.letra3_dark : style.letra3} >
            Confirm password
            </label>
          <Input
            state={password2}
            setState={setPassword2}
            name="confirm-password"
            type="password"
            // label="Confirm password"
            placeholder="Confirm password"
          />
          {password2.value !== password.value && (
            <span>Password does not match</span>
          )}

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
            Register
          </LoadingButton>

          {validForm === true && <span>Thank you!</span>}
        </form>
        <br />
        <hr className={style.separator} />
        <br />
        <LoadingButton
          onClick={(e) => handleClick(e)}
          endIcon={<GoogleIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Sign in with Google
        </LoadingButton>

        {error && <span>{error}</span>}
        <p>
          <Link className={style.sing} to="/login">
            Already have an account? Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register
