import React from 'react';
import { Box, CssBaseline, Drawer, Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Titlebar from '../MainGrid/Titlebar';
import LoginButton from '../login-button';
import ListingCard from '../MainGrid/ListingCard';
import ListingCardGrid from '../MainGrid/ListingCardGrid';
import HeaderTable from '../MainGrid/HeaderTable';
import NewListingForm from '../MainGrid/NewListingForm';

const drawerWidth = 22; 

const LayoutComponent: React.FC = () => {
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
        sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}%)`, backgroundColor: '#303030'}}
        
      >
        <LoginButton 
          label="Login"
          onClick={() => console.log('Login')}
        />
        <Titlebar />
        <HeaderTable />
        <NewListingForm />
        
      </Box>
    </Box>
  );
};

export default LayoutComponent;
