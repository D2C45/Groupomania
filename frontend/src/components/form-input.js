import React from 'react';

const FormInput = ({inputName, inputType=inputName, inputHolder}) => {
    return (
        <div className='input-container'>
            <label htmlFor={inputName}>{inputHolder}</label>
            <input type={inputType} name={inputName} id={inputName} placeholder={inputHolder} />
        </div>
    );
};

export default FormInput;