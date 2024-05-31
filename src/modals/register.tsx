import React from 'react';
import { CircleX } from 'lucide-react' 

type LoginModalProps = {
    onClick?: () => void;
    onSignInClick?: () => void;
    password: string;
    username: string;
    email: string;
    isOpen?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClick, password, username, email, isOpen, onSignInClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex-row w-full">
                    <h1 className="flex-1 text-2xl font-bold mb-4">Register</h1>
                    <div className="absolute">
                        <CircleX size={20}/>
                    </div>
                </div>
                <div className="flex-col space-x-5">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => {}} className="mb-2 p-2 border rounded" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => {}} className="mb-2 p-2 border rounded" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => {}} className="mb-4 p-2 border rounded" />
                    <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded">Register</button>
                </div>
                <p className="mt-4">Already have an account? <a className="text-blue-800" onClick={onSignInClick}>Sign In</a></p>
            </div>
        </div>
    );
}

export default LoginModal;
