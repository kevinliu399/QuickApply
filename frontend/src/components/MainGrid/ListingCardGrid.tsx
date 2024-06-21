import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ListingCard from './ListingCard';

const API_URL = 'http://localhost:8080/jobs'; // Change at production

interface Listing {
  title?: string;
  company?: string;
  description?: string;
  status?: string;
  // POSSIBILITIES FOR STATUS LEGEND
  // WATCHING => GRAY
  // APPLIED => GREEN
  // INTERVIEWING => YELLOW
  // REJECTED => RED

  applied?: boolean;

  // double check for type
  applicationDate?: string;
  interviewDate?: string;
  offerDate?: string;
  tags?: string[];
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

  return (
      <Box>
        {listings.map((listing) => (
          <ListingCard
            title={listing.title}
            company={listing.company}
            description={listing.description}
            status={listing.status}
            applied={listing.applied}
            applicationDate={listing.applicationDate}
            interviewDate={listing.interviewDate}
            offerDate={listing.offerDate}
            tags={listing.tags}
          />
        ))}
      </Box>
    );
  };

export default ListingCardGrid;
