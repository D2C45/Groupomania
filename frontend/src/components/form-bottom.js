import Button from './button';

const FormBottom = ({isSignup, setIsSignup}) => {
    const handleForm = (e) => {
        e.preventDefault();
        setIsSignup(!isSignup);
    }

    return (
        <div className='input-container isSignup-container'>
            <p>{isSignup ? 'Déjà' : 'Pas encore'} inscrit?</p>
            <Button addClass='btn-small' btnName={isSignup ? 'Se connecter' : `S'inscrire`} onClick={handleForm} />
        </div>
    );
};

export default FormBottom;