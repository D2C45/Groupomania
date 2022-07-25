import React, { useState } from 'react';
import FormInput from './form-input';
import Button from './button';

const Signup = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');    
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const nameValidation = require('../utils/functions').nameValidation;
    const emailValidation = require('../utils/functions').emailValidation;
    const passwordValidation = require('../utils/functions').passwordValidation;

    return (
        <form method='post'>
            <FormInput inputName={'lastName'} inputType={'text'} inputHolder={'Nom'} Value={lastName} errorMsg={lastNameErrorMsg} onChange={(e) => nameValidation(e, setLastName, setLastNameErrorMsg)} />
            <FormInput inputName={'firstName'} inputType={'text'} inputHolder={'Prénom'} Value={firstName} errorMsg={firstNameErrorMsg} onChange={(e) => nameValidation(e, setFirstName, setFirstNameErrorMsg)} />
            <FormInput inputName={'email'} inputHolder={'Email'} Value={email} errorMsg={emailErrorMsg} onChange={(e) => emailValidation(e, setEmail, setEmailErrorMsg)} />
            <FormInput inputName={'password'} inputHolder={'Mot de passe'} Value={password} errorMsg={passwordErrorMsg} onChange={(e) => passwordValidation(e, setPassword, setPasswordErrorMsg)} />
            <Button btnName={`S'inscrire`} />
        </form>
    );
};

export default Signup;