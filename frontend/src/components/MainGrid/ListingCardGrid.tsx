import React, { useState, useEffect, useRef } from 'react';
import { Box, Fab, TextField, Card, CardContent, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ListingCard from './ListingCard';

const API_URL = 'http://localhost:8080/jobs'; // Change at production

interface Listing {
  title: string;
  company: string;
  isChecked: boolean;
  isEditing: boolean;
  status: 'red' | 'green' | 'yellow';
}

const ListingCardGrid: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newListing, setNewListing] = useState<Listing>({
    title: '',
    company: '',
    isChecked: false,
    isEditing: true,
    status: 'yellow',
  });
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleAddListing = async () => {
    console.log('Submitting new listing:', newListing); // Debugging step
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });

      console.log('Response received:', response); // Debugging step

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data); // Debugging step
      setListings((prevListings) => [...prevListings, data]);
      setIsAdding(false);
      setNewListing({ title: '', company: '', isChecked: false, isEditing: true, status: 'yellow' });
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked'); // Debugging step
    setIsAdding(false);
    setNewListing({ title: '', company: '', isChecked: false, isEditing: true, status: 'yellow' });
  };

  const handleStatusClick = () => {
    const nextStatus = newListing.status === 'red' ? 'yellow' : newListing.status === 'yellow' ? 'green' : 'red';
    setNewListing({ ...newListing, status: nextStatus });
  };

  useEffect(() => {
    console.log('isAdding changed:', isAdding); // Debugging step
  }, [isAdding]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box>
        {listings.map((listing, index) => (
          <ListingCard
            key={index}
            title={listing.title}
            company={listing.company}
            isChecked={listing.isChecked}
            isEditing={listing.isEditing}
            color={listing.status}
          />
        ))}
        {isAdding && (
          <Card ref={formRef} sx={{ marginBottom: 2, mx: 10, mt: 4.5 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#D9D9D9',
                p: 2,
                borderRadius: 5,
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <TextField
                variant="standard"
                label="Title"
                value={newListing.title}
                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                sx={{ mx: 1, flex: 1 }}
                inputProps={{ sx: { textAlign: 'center' }, maxLength: 28 }}
              />
              <TextField
                variant="standard"
                label="Company"
                value={newListing.company}
                onChange={(e) => setNewListing({ ...newListing, company: e.target.value })}
                sx={{ mx: 1, flex: 1 }}
                inputProps={{ sx: { textAlign: 'center' }, maxLength: 20 }}
              />
              <Box
                onClick={handleStatusClick}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: newListing.status,
                  cursor: 'pointer',
                  mx: 1,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newListing.isChecked}
                    onChange={(e) => setNewListing({ ...newListing, isChecked: e.target.checked })}
                    sx={{
                      color: 'gray',
                      '&.Mui-checked': {
                        color: 'gray',
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: 24,
                      },
                    }}
                  />
                }
                label="Applied"
                sx={{ mx: 1 }}
              />
              <IconButton onClick={handleCancel} sx={{ bgcolor: '#B76767', borderRadius: '50%' }}>
                <CloseIcon sx={{ maxWidth: 16, ml: '0.8px' }} />
              </IconButton>
            </CardContent>
          </Card>
        )}
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          if (isAdding) {
            console.log('CheckIcon clicked, attempting to add listing.'); // Debugging step
            handleAddListing();
          } else {
            console.log('AddIcon clicked, setting isAdding to true.'); // Debugging step
            setIsAdding(true);
          }
        }}
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
        {isAdding ? <CheckIcon sx={{ color: 'black' }} /> : <AddIcon sx={{ color: 'black' }} />}
      </Fab>
    </div>
  );
};

export default ListingCardGrid;
