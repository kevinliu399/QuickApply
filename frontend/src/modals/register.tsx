import React, { useState } from 'react';
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
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            email,
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                setErrMsg('');
            } else {
                setErrMsg('Username already exists')
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setEmail("");
        setUsername("");
        setPassword("");
    };

    const handleCloseSuccessful = () => {
      if (onSignInClick) {
        onSignInClick();
      }
      setIsSuccess(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="absolute top-0 bottom-0 left-64 right-0 flex items-center justify-center">
                {!isSuccess && (
                    <div className="bg-white p-4 rounded-xl shadow-2xl w-1/2 items-center justify-center space-y-4 gradient-border">
                        <div className="flex justify-between items-center py-6">
                            <h1 className="text-2xl font-bold">Register</h1>
                            <CircleX size={20} onClick={onClick} className="cursor-pointer hover:text-main-green hover:duration-200" />
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <CustomTextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                variant="outlined"
                                className="mb-2 p-2"
                                borderColor="black"
                            />
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
                                variant="outlined"
                                className="mb-2 p-2"
                                borderColor="black"
                            />
                            <div className="flex justify-center py-2 items-center w-full">
                                <button type="submit" className="text-gray-800 font-semibold py-2 px-8 rounded-xl border-2 hover:bg-main-green hover:duration-500 hover:shadow-md">Sign Up</button>
                            </div>
                        </form>
                        {errMsg && (

                          <p style={{color: 'red'}}>
                            {errMsg}
                          </p>
                          )}
                        <p className="mt-4">Already have an account? <a className="text-gray-400 hover:text-main-green hover:duration-200 hover:underline cursor-pointer" onClick={onSignInClick}>Sign In</a></p>
                        
                    </div>
                    
                  
                )}
                {isSuccess && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-xl shadow-2xl w-1/3 items-center justify-center space-y-4">
                            <h2 className="text-2xl font-bold">Registration successful</h2>
                            <button onClick={handleCloseSuccessful} className="text-gray-800 font-semibold py-2 px-8 rounded-xl border-2 hover:bg-main-green hover:duration-500 hover:shadow-md">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterModal;
