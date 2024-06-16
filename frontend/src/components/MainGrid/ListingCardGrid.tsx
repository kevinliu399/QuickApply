import React from 'react';
import { Box } from '@mui/material';
import ListingCard from './ListingCard';

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

const ListingCardGrid: React.FC<ListingCardGridProps> = ({ listings }) => {
  return (
    <Box>
      {listings.map((listing, index) => (
        <ListingCard
          key={index}
          title={listing.title}
          company={listing.company}
          isChecked={listing.isChecked}
          isEditing={listing.isEditing}
          color={listing.color}
        />
      ))}
    </Box>
  );
};

export default ListingCardGrid;
