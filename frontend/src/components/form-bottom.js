import Button from './button';

const FormBottom = ({signup, setSignup}) => {
    const handleForm = (e) => {
        e.preventDefault();
        setSignup(!signup);
    }

    return (
        <div className='input-container signup-container'>
            <p>{signup ? 'Déjà' : 'Pas encore'} inscrit?</p>
            <Button addClass='btn-small' btnName={signup ? 'Se connecter' : `S'inscrire`} onClick={handleForm} />
        </div>
    );
};

export default FormBottom;