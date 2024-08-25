import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HamburgerMenuProps {
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick }) => (
  <IconButton
    edge="start"
    color="inherit"
    aria-label="menu"
    onClick={onClick}
    sx={{ 
      position: 'fixed', 
      top: 16, 
      left: 16, 
      zIndex: 1300,
      display: { xs: 'block', md: 'none' } // Show on small screens, hide on medium and up
    }}
  >
    <MenuIcon sx={{ color: 'white' }} />
  </IconButton>
);

export default HamburgerMenu;
