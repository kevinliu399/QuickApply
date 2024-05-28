import React from 'react';
import LoginButton from '../login-button';

const Titlebar: React.FC = () => {
    return (
        <>
            Titlebar
            <LoginButton 
                label="Login"
                onClick={() => console.log('login')}
            />
        </>
    )
}

export default Titlebar;