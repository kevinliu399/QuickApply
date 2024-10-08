import React from 'react';

type LoginButtonProps = {
    onClick: () => void;
    label: string;
};

const LogoutButton: React.FC<LoginButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="bg-main-green px-6 py-2 rounded-3xl shadow-md hover:shadow-2xl">
            <span className="font-bold text-main-black"> {label} </span>
        </button>
    );
};

export default LogoutButton;
