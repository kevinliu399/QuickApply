import React, { useState, useContext } from 'react';
import { Box, CssBaseline, Drawer, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Titlebar from '../MainGrid/Titlebar';
import LoginButton from '../login-button';
import LoginModal from '../../modals/login';
import RegisterModal from '../../modals/register';
import HeaderTable from '../MainGrid/HeaderTable';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import ListingCardGrid from '../MainGrid/ListingCardGrid';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const drawerWidth = 22;

const LayoutComponent: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isloginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLoginOpen = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  }
  const handleLoginClose = () => setLoginModalOpen(false);

  const handleRegisterOpen = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const handleRegisterClose = () => setRegisterModalOpen(false);

  const logoutClick = () => {
    authService.logout();
    setUser(null);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      
      {/* Hamburger Menu */}
      <HamburgerMenu onClick={toggleSidebar} />

      {/* Sidebar */}
      <Drawer
        sx={{
          width: isMobile ? '100%' : `${drawerWidth}%`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : `${drawerWidth}%`,
            boxSizing: 'border-box',
            borderRight: '2px solid #67FFA4'
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? isSidebarOpen : true}
        onClose={toggleSidebar}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}%)` },
          backgroundColor: '#303030', 
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          {!user ? (
            <LoginButton label="Login" onClick={handleLoginOpen} />
          ) : (
            <Button onClick={logoutClick}>Logout {user?.username}</Button>
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