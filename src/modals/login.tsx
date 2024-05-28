import React from 'react';

type LoginModalProps = {
    onClick?: () => void;
    password: string;
    username: string;
    email: string;
}

const LoginModal: React.FC<LoginModalProps> = ( {onClick, password, username, email} ) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <input type="text" placeholder="Username" value={username} onChange={(e) => {}} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => {}} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => {}} />
                <button onClick={onClick}>Login</button>
                <p>Don't have an account? <a href="#">Sign up</a></p>
            </div>
        </div>
    )
}

export default LoginModal