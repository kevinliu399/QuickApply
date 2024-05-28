import React from 'react';

type loginModalProps = {
    onClick?: () => void;
    password: string;
    username: string;
    email: string;
}

const loginModal: React.FC<loginModalProps> = ( {onClick, password, username, email} ) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <input type="text" placeholder="Username" value={username} onChange={(e) => {}} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => {}} />
                <button onClick={onClick}>Login</button>
            </div>
        </div>
    )
}