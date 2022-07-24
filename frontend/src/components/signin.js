import React from 'react';
import logo from '../assets/logo.png';
import Button from './button';
import FormBottom from './form-bottom';
import FormInput from './form-input';
import { useState } from 'react';

const Signin = () => {
    const [signup, setSignup] = useState(false);

    return (
        <form className='form'>
            <div>
                <img src={logo} alt='logo de Groupomania' className='logo' />
            </div>
            {signup && (
                <div>
                    <FormInput inputName={'lastName'} inputType={'text'} inputHolder={'Nom'} />
                    <FormInput inputName={'firstName'} inputType={'text'} inputHolder={'Prénom'} />
                </div>
            )}
            <FormInput inputName={'email'} inputHolder={'Email'} />
            <FormInput inputName={'password'} inputHolder={'Mot de passe'} />
            <Button btnName={!signup ? 'Se connecter' : `S'inscrire`} />
            <FormBottom alreadyOrNot={'Pas encore'} btnDescription={`S'inscrire`} signup={signup} setSignup={setSignup}/>
        </form>
    );
};

export default Signin;