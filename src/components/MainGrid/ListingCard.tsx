import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './font.css'

const ListingCard: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#D9D9D9"
      p={1}
      borderRadius={5}
      width="95%"
      ml={5}
      mr={5}
      height={70}
    >
      <Typography className="rubik" variant="body1">Software Developer</Typography>
      <Typography className="rubik" variant="body1">Google</Typography>
      <Box
        sx={{
          bgcolor: 'red',
          borderRadius: '50%',
          width: 32,
          height: 32
        }}
      />
      <CheckIcon />
      <CloseIcon />
    </Box>
  );
};

export default ListingCard;
