import React, { useState, useContext } from 'react';
import { Box, CssBaseline, Drawer, Typography, Button, useMediaQuery, useTheme, Card, CardContent } from '@mui/material';
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
import LogoutButton from '../logout-button';


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
        <Box sx={{ position: 'absolute', top: 28, right: 28 }}>
          {!user ? (
            <>
            </>
          ) : (
            <LogoutButton label={`Switch Accounts`} onClick={logoutClick}></LogoutButton>
            
          )}
        </Box>

        <Titlebar />
            {user && <HeaderTable />}
            {!user && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Card sx={{ width: 400, height: 650, padding: 1, textAlign: 'center', backgroundColor: 'rgb(31, 29, 27)', border: '2px solid rgb(103, 254, 164)', borderRadius: 5 }}>
                        <CardContent>
                          <h1 className="text-5xl mb-20 mt-20 font-rubik font-semibold text-center text-[rgba(255,255,255)]">
                            QuickApply
                          </h1>
                            <Typography variant="body1" color="#FFFFFF" gutterBottom sx={{marginTop: 0,fontFamily: 'rubik', fontSize: '20px'}}>
                                - Save essential profile links
                            </Typography>
                            <Typography variant="body1" color="#FFFFFF" gutterBottom sx={{marginTop: 2,fontFamily: 'rubik', fontSize: '20px'}}>
                               
                                - Organize and track job applications

                            </Typography>
                            <Typography variant="body1" color="#FFFFFF" gutterBottom sx={{marginTop: 2,fontFamily: 'rubik', fontSize: '20px'}}>

                                - Set custom tags and statuses
                            </Typography>
                            <Typography variant="body2" color="#FFFFFF" sx={{ marginTop: 10, marginBottom: 2, fontFamily: 'rubik', fontSize: '24px', fontWeight: 500}}>
                                Access QuickApply now
                            </Typography>
                            
                            
                            <LoginButton label="Register" onClick={handleRegisterOpen}/>
                            <Typography 
                              variant="body1" 
                              color="#FFFFFF" 
                              gutterBottom 
                              onClick={handleLoginOpen}
                              sx={{
                                position: 'relative', 
                                marginTop: 10,
                                fontFamily: 'rubik', 
                                fontSize: '13px', 
                                bottom: 0,
                                cursor: 'pointer',
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                            >
  Already have an account? Login
</Typography>

                            
                        </CardContent>
                    </Card>
                </Box>
            )}
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