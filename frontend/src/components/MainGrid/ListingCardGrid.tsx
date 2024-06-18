import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
    </Box>
  );
};

export default ListingCardGrid;
