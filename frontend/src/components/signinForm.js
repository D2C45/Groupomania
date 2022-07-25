import React, { useState } from 'react';
import FormInput from './form-input';
import Button from './button';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const emailValidation = require('../utils/functions').emailValidation;
    const passwordValidation = require('../utils/functions').passwordValidation;

 return (
        <form method='post'>
            <FormInput inputName={'email'} inputHolder={'Email'} Value={email} errorMsg={emailErrorMsg} onChange={(e) => emailValidation(e, setEmail, setEmailErrorMsg)}/>
            <FormInput inputName={'password'} inputHolder={'Mot de passe'} Value={password} errorMsg={passwordErrorMsg} onChange={(e) => passwordValidation(e, setPassword, setPasswordErrorMsg)}/>
            <Button btnName={'Se connecter'} />
        </form>
    );
};

export default Signin;