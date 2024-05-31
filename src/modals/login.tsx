import React from 'react';

type LoginModalProps = {
    onClick?: () => void;
    onSignUpClick?: () => void;
    password: string;
    username: string;
    email: string;
    isOpen?: boolean;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClick, onSignUpClick, password, username, email, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input type="text" placeholder="Username" value={username} onChange={(e) => {}} className="mb-2 p-2 border rounded" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => {}} className="mb-2 p-2 border rounded" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => {}} className="mb-4 p-2 border rounded" />
                <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded">Login</button>
                <p className="mt-4">Don't have an account? <a href="#" className="text-blue-500" onClick={onSignUpClick}>Sign up</a></p>
            </div>
        </div>
    );
};

export default LoginModal;
