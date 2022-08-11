import React, { useContext } from "react";
import { useState } from "react";
import style from "../styles/Forms.module.css";
import Input from "./Input";
import { singUpAirline } from "../scripts/auth";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { darkModeContext } from "../DarkModeContext";
// import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function RegisterAirline() {
  const [validForm /*setValidForm*/] = useState(null);
  const navigate = useHistory();
  const { darkMode } = useContext(darkModeContext);
  // const error = useSelector((state) => state.error);

  const [name, setName] = useState({ value: "", valid: null });
  const [image, setImage] = useState({ value: "", valid: null });
  const [phone, setPhone] = useState({ value: "", valid: null });
  const [email, setEmail] = useState({ value: "", valid: null });
  const [password, setPassword] = useState({ value: "", valid: null });
  const [password2, setPassword2] = useState({ value: "", valid: null });

  const [terminos, setTerminos] = useState(false);
  console.log(terminos);

  const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //eslint-disable-line
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, //eslint-disable-line
    image: /\.(jpg|png|gif|bmp)$/i,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character (*)
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (terminos === true &&
      name.valid === 'true' &&
      image.valid === 'true' &&
      email.valid === 'true' &&
      phone.valid === 'true' &&
      password.valid === 'true' &&
      password2.value === password.value 
      ) {
      let type = await singUpAirline(
        e.target.email.value,
        e.target.password.value,
        e.target.name.value,
        e.target.image.value,
        e.target.phone.value
      );
      // navigate.goBack();
      if (typeof type == "string") {
        // alert(type)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: "#10408F",
        });

      } else {
        Swal.fire({
          icon: "success",
          title: "Done!",
          text: "Registro exitoso!",
          confirmButtonColor: "#10408F",
        });
        navigate.push("/");
        window.location.reload();
      }
    } else if(terminos === false){
      console.log("falta el check");
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Agree to terms and conditions to sent form",
        confirmButtonColor: "#10408F",
      });
 
    }else{
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Complete all fields",
        confirmButtonColor: "#10408F",
      });
 
    }
  }

  function onChangeAirline(e) {
    // e.preventDefault();
    setTerminos(e.target.checked);
  }

  return (
    <div className={darkMode ? style.todo_dark : style.todo}>
      <div
        className={
          darkMode ? style.container_airline_dark : style.container_airline
        }
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={style.form_container}
        >
          <h1>Add your Airline ✈️</h1>

          <Input
            state={name}
            setState={setName}
            type="text"
            label="Airline Name"
            placeholder="Airline Name"
            name="name"
            error="Your first name cannot contain numbers or special characters"
            regularExpression={expression.name}
          />

          <Input
            state={image}
            setState={setImage}
            name="image"
            type="text"
            label="Image"
            placeholder="Image URL"
            error="Please provide an image for your airline"
            regularExpression={expression.image}
          />

          <Input
            state={email}
            setState={setEmail}
            name="email"
            type="email"
            label="email"
            placeholder="E-mail"
            error="Please enter a valid email"
            regularExpression={expression.email}
          />

          <Input
            state={phone}
            setState={setPhone}
            name="phone"
            type="number"
            label="Airline Phone"
            placeholder="Phone"
            error="Please enter a valid phone number"
            regularExpression={expression.phone}
          />

          <Input
            state={password}
            setState={setPassword}
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            error="Your passwords needs 8-12 characters, one special symbol, one number, at least one lowercase letter and at least one uppercase letter"
            regularExpression={expression.password}
          />

          <Input
            state={password2}
            setState={setPassword2}
            name="confirm-password"
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
          />
          {password2.value !== password.value && (
            <span>Password does not match</span>
          )}

          <input
            className={style.checkBtn}
            type="checkbox"
            name="terminos"
            id="terminos"
            onChange={onChangeAirline}
            checked={terminos}
          />
          <span className={style.span_airlines}>
            By selecting this option, you're acknowledging that you're sending a
            form made only for airlines and accepting the Terms & Conditions.
            Therefore it will be processed and reviewed for approval
          </span>

          {validForm === false && (
            <span>Please complete all fields correctly</span>
          )}

          <Button type="submit" variant="contained">
            Register Airline
          </Button>

          {validForm === true && <span>Thank you!</span>}
        </form>
      </div>
    </div>
  );
}
