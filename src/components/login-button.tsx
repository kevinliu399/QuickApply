import React from 'react';

type LoginButtonProps = {
    onClick: () => void;
    label: string;
};

const LoginButton: React.FC<LoginButtonProps> = ( {label, onClick} ) => {
    return (
        <button className="">
            {label}

        </button>
    )
};

export default LoginButton;