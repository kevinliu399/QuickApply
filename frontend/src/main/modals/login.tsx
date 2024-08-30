import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import authService from '../services/authService';
import './modal.css';
import { useAuth } from '../context/AuthContext';

type LoginModalProps = {
    onClick?: () => void;
    onSignUpClick?: () => void;
    isOpen?: boolean;
    onLoginSuccess?: () => void; // Add this prop
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

const LoginModal: React.FC<LoginModalProps> = ({ onClick, isOpen, onSignUpClick, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { setUser }  = useAuth();

    const handleLogin = async () => {
      try {
          const response = await authService.login(username, password);
          
          // Update the AuthContext with the logged-in user
          setUser(response.user);

          console.log(response);
          // Notify the parent component about the successful login
          if (onLoginSuccess) onLoginSuccess();
          // Redirect or close modal after successful login
          if (onClick) onClick();

          window.location.reload();
      } catch (err) {
          setError('Invalid username or password');
      }

      setPassword("");
      setUsername("");
  };

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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            label="Username"
                            variant="outlined"
                            className="mb-2 p-2"
                            borderColor="black"
                        />
                        <CustomTextField 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            label="Password"
                            type="password"
                            variant="outlined"
                            className="mb-2 p-2" 
                            borderColor="black"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-center py-2 items-center w-full">
                        <button onClick={handleLogin} className="text-gray-800 font-semibold py-2 px-8 rounded-xl border-2 hover:bg-main-green hover:duration-500 hover:shadow-md">Sign In</button>
                    </div>
                    <p className="mt-4">Don't have an account? <a className="text-gray-800 hover:text-main-green hover:duration-200 hover:underline cursor-pointer" onClick={onSignUpClick}>Register</a></p>    
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
