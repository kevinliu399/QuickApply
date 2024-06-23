import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import ListingCard from './ListingCard';
import { styled } from '@mui/system';

const API_URL = 'http://localhost:8080/jobs'; // Change at production

interface Listing {
  title?: string;
  company?: string;
  description?: string;
  status?: string;
  applied?: boolean;
  applicationDate?: string;
  interviewDate?: string;
  offerDate?: string;
  tags?: string[];
}

const CustomPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    color: 'white',
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: 'green',
  },
  '& .MuiPaginationItem-ellipsis': {
    color: 'white',
  },
  '& .MuiPaginationItem-page': {
    '&:hover': {
      backgroundColor: '#67FFA4',
    },
  },
  '& .MuiPaginationItem-icon': {
    color: '#67FFA4',
  },
});

const ListingCardGrid: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(10);

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

    // Calculate number of listings per page based on viewport height
    const updateListingsPerPage = () => {
      const viewportHeight = window.innerHeight;
      const cardHeight = 150;
      const newPerPage = Math.floor((viewportHeight - 200) / cardHeight);
      setListingsPerPage(newPerPage > 0 ? newPerPage : 1);
    };

    updateListingsPerPage();
    window.addEventListener('resize', updateListingsPerPage);

    return () => window.removeEventListener('resize', updateListingsPerPage);
  }, []);

  // Get current listings for the page
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const getDisplayedPages = (count: number, page: number): (number | string)[] => {
    let pages: (number | string)[] = [];
    
    if (count <= 5) {
      pages = [...Array(count).keys()].map(n => n + 1);
    } else {
      if (page <= 3) {
        // If current page is 1, 2, or 3, show 1, 2, 3, 4, ..., n
        pages = [1, 2, 3, 4, '...', count];
      } else if (page >= count - 2) {
        // If current page is n, n-1, or n-2, show 1, ..., n-3, n-2, n-1, n
        pages = [1, '...', count - 3, count - 2, count - 1, count];
      } else {
        // For all other cases, show 1, ..., previous, current, next, ..., n
        pages = [1, '...', page - 1, page, page + 1, '...', count];
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col h-full overflow-y-hidden">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow overflow-y-hidden">
          {currentListings.map((listing, index) => (
            <ListingCard
              key={index}
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
        </div>
      )}
      <div className="absolute justify-start mb-10 ml-10 bottom-5">
        <CustomPagination
          count={Math.ceil(listings.length / listingsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              style={{
                display:
                  item.type === 'page'
                    ? getDisplayedPages(Math.ceil(listings.length / listingsPerPage), currentPage).includes(item.page as number | string)
                      ? 'flex'
                      : 'none'
                    : 'flex',
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ListingCardGrid;
