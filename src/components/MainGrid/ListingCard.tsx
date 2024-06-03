import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import './font.css';

const ListingCard: React.FC = () => {
  return (
    <Box mx={10} mt={3} position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#D9D9D9"
        p={1}
        borderRadius={5}
        width="100%"
        height={60}
        position="relative"
      >
        <Typography className="rubik" variant="body1" sx={{ flex: 1, textAlign: 'center' }}>Software Developer</Typography>
        <Typography className="rubik" variant="body1" sx={{ flex: 1, textAlign: 'center' }}>Amazon</Typography>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#EC3737',
              borderRadius: '50%',
              width: 30,
              height: 30,
              ml: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Checkbox
            sx={{
              color: 'gray',
              ml: 1.5,
              '&.Mui-checked': {
                color: 'gray',
              },
              '& .MuiSvgIcon-root': {
                fontSize: 24,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#64CEBB',
              borderRadius: '50%',
              width: 19,
              height: 19,
              ml: 1,
            }}
          >
            <EditIcon sx={{ maxWidth: 13, ml: '0.79px' }} />
            </ Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#B76767',
              borderRadius: '50%',
              width: 19,
              height: 19,
              ml: 1,
            }}
          >
            <CloseIcon sx={{ maxWidth: 16, ml: '0.8px' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
