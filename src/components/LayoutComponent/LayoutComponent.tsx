import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Titlebar from '../MainGrid/Titlebar';
import LoginButton from '../login-button';
import LoginModal from '../../modals/login';
import RegisterModal from '../../modals/register';

const drawerWidth = 22; 

const LayoutComponent: React.FC = () => {
  const [isloginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  }
  const handleLoginClose = () => {
    setLoginModalOpen(false);
  }

  const handleRegisterOpen = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
};

const handleRegisterClose = () => {
    setRegisterModalOpen(false);
};

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      
    {/* side bar */}
      <Drawer
        sx={{
          width: `${drawerWidth}%`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: `${drawerWidth}%`,
            boxSizing: 'border-box',
            borderRight: '2px solid #67FFA4'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Sidebar />

      </Drawer>

    {/* Main part of the project */}
      <Box
        component="main"
        sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}%)` }}
      >
        <LoginButton 
          label="Login"
          onClick={handleLoginOpen}
        />
        <Titlebar />
      </Box>
      <LoginModal
            isOpen={isloginModalOpen}
            onClick={handleLoginClose}
            onSignUpClick={handleRegisterOpen}
        />
      <RegisterModal
          isOpen={isRegisterModalOpen}
          onClick={handleRegisterClose}
          onSignInClick={handleLoginOpen}
      />
    
    </Box>
  );
};

export default LayoutComponent;
