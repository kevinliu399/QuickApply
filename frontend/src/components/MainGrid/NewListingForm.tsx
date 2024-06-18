import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListingCardGrid from './ListingCardGrid';

interface Listing {
  title: string;
  company: string;
  isChecked: boolean;
  isEditing: boolean;
  color: 'red' | 'green' | 'yellow';
}

interface ListingCardGridProps {
  listings: Listing[];
}

const NewListingForm: React.FC = () => {

  const handleAddListing = () => {
  };

  return (
    <Box>
      <ListingCardGrid/>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddListing}
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          backgroundColor: 'white',
          border: '4px solid #67FFA4',
          color: 'black',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <AddIcon sx={{ color: 'black' }} />
      </Fab>
    </Box>
  );
};

export default NewListingForm;
