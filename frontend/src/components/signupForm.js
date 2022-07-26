import React, { useState } from 'react';
import FormInput from './form-input';
import Button from './button';
import axios from 'axios';

const Signup = ({isSignup, setIsSignup}) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');    
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const [lastNameValid, setLastNameValid] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const nameValidation = require('../utils/functions').nameValidation;
    const emailValidation = require('../utils/functions').emailValidation;
    const passwordValidation = require('../utils/functions').passwordValidation;

    const signup = (e) => {
        e.preventDefault();

        if(lastName.length === 0) {
            setLastNameErrorMsg('Ce champ est requis')
        }
        else if(firstName.length === 0) {
            setFirstNameErrorMsg('Ce champ est requis')
        }
        else if(email.length === 0) {
            setEmailErrorMsg('Ce champ est requis')
        }
        else if(password.length === 0) {
            setPasswordErrorMsg('Ce champ est requis')
        }
        else if(lastNameValid && firstNameValid && emailValid && passwordValid){
            axios({
                method:'post',
                url: `${process.env.REACT_APP_API_URL}api/user/signup`,
                data: {
                    firstName,
                    lastName,
                    email,
                    password
                }
            })
                .then ((response) => {
                        console.log(response);
                        window.alert('Vous êtes bien inscrit, vous pouvez maintenant vous connecter');
                        setIsSignup(!isSignup);
                    })
                .catch (function(error) {
                    console.log(error);
                    if(error.response.status === 500){
                        setEmailErrorMsg(error.response.data.error.errors.email.message);
                    }
                    else if(error.response.status === 400){
                        setPasswordErrorMsg(error.response.data.error[0].message)
                    }                    
                })            
        }
    }

    return (
        <form method='post'>
            <FormInput inputName={'lastName'} inputType={'text'} inputHolder={'Nom'} Value={lastName} errorMsg={lastNameErrorMsg} onChange={(e) => nameValidation(e, setLastName, setLastNameErrorMsg, setLastNameValid)} />

            <FormInput inputName={'firstName'} inputType={'text'} inputHolder={'Prénom'} Value={firstName} errorMsg={firstNameErrorMsg} onChange={(e) => nameValidation(e, setFirstName, setFirstNameErrorMsg, setFirstNameValid)} />

            <FormInput inputName={'email'} inputHolder={'Email'} Value={email} errorMsg={emailErrorMsg} onChange={(e) => emailValidation(e, setEmail, setEmailErrorMsg, setEmailValid)} />

            <FormInput inputName={'password'} inputHolder={'Mot de passe'} Value={password} errorMsg={passwordErrorMsg} onChange={(e) => passwordValidation(e, setPassword, setPasswordErrorMsg, setPasswordValid)} />

            <Button btnName={`S'inscrire`} onClick={signup}/>
        </form>
    );
};

export default Signup;