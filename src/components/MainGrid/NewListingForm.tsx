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

const NewListingForm: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([
    { title: 'Software Developer', company: 'Amazon', isChecked: false, isEditing: false, color: 'red' },
    { title: 'Project Manager', company: 'Google', isChecked: true, isEditing: false, color: 'green' },
    { title: 'UX Designer', company: 'Facebook', isChecked: false, isEditing: false, color: 'yellow' },
  ]);

  const handleAddListing = () => {
    const newListing: Listing = { title: '', company: '', isChecked: false, isEditing: true, color: 'red' };
    setListings([...listings, newListing]);
  };

  return (
    <Box>
      <ListingCardGrid listings={listings} />
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
