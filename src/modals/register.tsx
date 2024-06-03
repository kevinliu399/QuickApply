import React from 'react';
import { CircleX } from 'lucide-react';
import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles'; 

type RegisterModalProps = {
    onClick?: () => void;
    onSignInClick?: () => void;
    isOpen?: boolean;
};

type CustomTextFieldProps = {
  borderColor?: string;
};

const options = {
  shouldForwardProp: (prop: string) => prop !== 'borderColor',
};

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
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: borderColor,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: borderColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
      borderBottomColor: borderColor,
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
      borderBottomColor: borderColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
      borderBottomColor: borderColor,
    },
  },
}));

const RegisterModal: React.FC<RegisterModalProps> = ({ onClick, isOpen, onSignInClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="absolute top-0 bottom-0 left-64 right-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-xl shadow-2xl w-1/2 items-center justify-center space-y-4 gradient-border">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold">Register</h1>
                        <CircleX size={20} onClick={onClick} className="cursor-pointer hover:text-main-green hover:duration-200" />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <CustomTextField  
                            onChange={(e) => {}} 
                            label="Email"
                            variant="outlined"
                            className="mb-2 p-2"
                            borderColor="black"
                        />

                        <CustomTextField  
                            onChange={(e) => {}} 
                            label="Username"
                            variant="outlined"
                            className="mb-2 p-2"
                            borderColor="black"
                        />
                        <CustomTextField 
                            onChange={(e) => {}} 
                            label="Password"
                            variant="outlined"
                            className="mb-2 p-2" 
                            borderColor="black"
                        />
                    </div>
                    <div className="flex justify-center py-2 items-center w-full">
                        <button onClick={onClick} className="text-gray-800 font-semibold py-2 px-8 rounded-xl border-2 hover:bg-main-green hover:duration-500 hover:shadow-md">Sign Up</button>
                    </div>
                    <p className="mt-4">Already have an account? <a className="text-gray-400 hover:text-main-green hover:duration-200 hover:underline cursor-pointer" onClick={onSignInClick}>Sign In</a></p>    
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
