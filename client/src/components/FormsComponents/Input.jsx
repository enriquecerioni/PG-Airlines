import React from 'react'
import style from '../styles/Forms.module.css'

function Input({state, setState, type, label, placeholder, name, error, regularExpression}) {
    
    function handleInputChange(e) {
        e.preventDefault()
        setState({
            ...state,
            value: e.target.value
        })
    }

    function validate() {
        if(regularExpression) {
            if(regularExpression.test(state.value)) {
                setState({
                    ...state,
                    valid: 'true'
                })
            } else {
                setState({
                    ...state,
                    valid: 'false'
                })
            }
        }
    }

  return (
    <div className={style.input_container}>
        <label valid={state.valid}>{label}</label>
            <input 
                id={name}
                type={type}
                placeholder={placeholder}
                value={state.value}
                onChange={handleInputChange}
                onBlur={validate}
                onKeyUp={validate}
                valid={state.valid}
            />

        {state.valid === 'false' && error ? <span className={style.errorFalse} valid={state.valid}>{error}</span>
        : <></>}
    </div>
  )
}

export default Input

/* className={state.valid ==='false' ? style.errorFalse : style.errorTrue} */