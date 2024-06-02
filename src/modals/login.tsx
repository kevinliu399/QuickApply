import React from 'react';
import { CircleX } from 'lucide-react';
import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import './modal.css';

type LoginModalProps = {
    onClick?: () => void;
    onSignUpClick?: () => void;
    isOpen?: boolean;
};

type CustomTextFieldProps = {
  borderColor?: string;
};

const options = {
  shouldForwardProp: (prop: string) => prop !== 'borderColor',
};

const outlinedSelectors = [
  '& .MuiOutlinedInput-notchedOutline',
  '&:hover .MuiOutlinedInput-notchedOutline',
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline',
];

const CustomTextField = styled(
  MuiTextField,
  options,
)<CustomTextFieldProps>(({ borderColor }) => ({
  '& label.Mui-focused': {
    color: borderColor,
  },
  '& .MuiInputLabel-root': {
    color: borderColor,
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: borderColor,
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: borderColor,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: borderColor,
  },
  [outlinedSelectors.join(',')]: {
    borderColor,
  },
}));

const LoginModal: React.FC<LoginModalProps> = ({ onClick, isOpen, onSignUpClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="absolute top-0 bottom-0 left-64 right-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-xl shadow-2xl w-1/2 items-center justify-center space-y-4 gradient-border">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold">Log In</h1>
                        <CircleX size={20} onClick={onClick} className="cursor-pointer hover:text-main-green hover:duration-200" />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <CustomTextField  
                            onChange={(e) => {}} 
                            label="Username"
                            variant="outlined"
                            className="mb-2 p-2 border rounded"
                            borderColor="black"
                        />
                        <CustomTextField 
                            onChange={(e) => {}} 
                            label="Password"
                            variant="outlined"
                            className="mb-2 p-2 border rounded" 
                            borderColor="black"
                        />
                    </div>
                    <div className="flex justify-center py-2 items-center w-full">
                        <button onClick={onClick} className=" text-gray-800 font-semibold py-2 px-8 rounded-xl border-2 hover:bg-main-green hover:duration-500 hover:shadow-md">Sign In</button>
                    </div>
                    <p className="mt-4">Don't have an account? <a className="text-gray-800 hover:text-main-green hover:duration-200 hover:underline cursor-pointer" onClick={onSignUpClick}>Register</a></p>    
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
