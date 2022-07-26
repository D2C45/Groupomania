import React, { useState } from 'react';
import axios from 'axios';
import FormInput from './form-input';
import Button from './button';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const emailValidation = require('../utils/functions').emailValidation;
    const passwordValidation = require('../utils/functions').passwordValidation;

    const login = (e) => {
        e.preventDefault();

        if(email.length === 0) {
            setEmailErrorMsg('Ce champ est requis')
        }
        else if(password.length === 0) {
            setPasswordErrorMsg('Ce champ est requis')
        }
        else if(emailValid && passwordValid){
            axios({
                method:'post',
                url: `${process.env.REACT_APP_API_URL}api/user/login`,
                data: {
                    email,
                    password
                }
            })
                .then ((response) => {
                    console.log(response);
                    localStorage.setItem("auth", JSON.stringify(response.data));
                    window.location = '/';
                })
                .catch (function(error) {
                    console.log(error);
                    setPasswordErrorMsg(error.response.data.error)
                })            
        }
    }

 return (
        <form method='post'>
            <FormInput inputName={'email'} inputHolder={'Email'} Value={email} errorMsg={emailErrorMsg} onChange={(e) => emailValidation(e, setEmail, setEmailErrorMsg, setEmailValid)} />

            <FormInput inputName={'password'} inputHolder={'Mot de passe'} Value={password} errorMsg={passwordErrorMsg} onChange={(e) => passwordValidation(e, setPassword, setPasswordErrorMsg, setPasswordValid)} />

            <Button btnName={'Se connecter'} onClick={login} />
        </form>
    );
};

export default Signin;