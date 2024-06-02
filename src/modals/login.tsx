import React from 'react';
import { CircleX } from 'lucide-react';
import { Input } from '@mui/material'; 
import { Button } from '@mui/material';

type LoginModalProps = {
    onClick?: () => void;
    onSignUpClick?: () => void;
    password: string;
    username: string;
    email: string;
    isOpen?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClick, password, username, email, isOpen, onSignUpClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="absolute top-0 bottom-0 left-64 right-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 items-center justify-center">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold">Log In</h1>
                        <CircleX size={20} onClick={onClick} className="cursor-pointer hover:text-main-green hover:duration-200" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Input placeholder="Username" value={username} onChange={(e) => {}} className="mb-2 p-2 border rounded"/>
                        <Input placeholder="Email" value={email} onChange={(e) => {}} className="mb-2 p-2 border rounded" />
                        <Input placeholder="Password" value={password} onChange={(e) => {}} className="mb-2 p-2 border rounded" />
                    </div>
                    <div className="py-2 items-center w-full justify-center">
                        <Button onClick={onClick} className="bg-blue-800 text-white p-2 rounded">Sign In</Button>
                    </div>
                    <p className="mt-4">Don't have an account? <a className="text-blue-800 cursor-pointer" onClick={onSignUpClick}>Register</a></p>    
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
