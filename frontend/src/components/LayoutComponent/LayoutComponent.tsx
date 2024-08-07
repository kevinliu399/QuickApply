import React, { useState, useContext } from 'react';
import { Box, CssBaseline, Drawer, Typography, Button } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Titlebar from '../MainGrid/Titlebar';
import LoginButton from '../login-button';
import LoginModal from '../../modals/login';
import RegisterModal from '../../modals/register';
// import NewListingForm from '../MainGrid/NewListingForm';
import HeaderTable from '../MainGrid/HeaderTable';
// import NewListingForm from '../MainGrid/NewListingForm';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import ListingCardGrid from '../MainGrid/ListingCardGrid';

const drawerWidth = 22;

const LayoutComponent: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const [isloginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const currentWidth = `calc(100% - ${drawerWidth}%)`;

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

  const logoutClick = () => {
    authService.logout();
    setUser(null); // Clear the user context on logout
  };

  const handleRegisterClose = () => {
    setRegisterModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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

      <Box
        component="main"
        sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}%)`, backgroundColor: '#303030', position: 'relative' }}
      >
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          {!user ? (
            <LoginButton
              label="Login"
              onClick={handleLoginOpen}
            />
          ) : (
            <Button onClick={logoutClick}>
              Logout {user?.username}
            </Button>
          )}
        </Box>

        <Titlebar />
        {user && <HeaderTable />}
        {!user && 
        <Box sx={{ml: 50, mt: 50}}>
          PLEASE LOG IN TO ADD JOB LISTINGS
        </Box>
        }
        {user && <ListingCardGrid />}
        {/* <NewListingForm /> */}
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
