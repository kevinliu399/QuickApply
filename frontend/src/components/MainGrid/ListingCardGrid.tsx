import React, { useState, useEffect } from 'react';
import { Fab, Pagination, PaginationItem, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import ListingCard from './ListingCard';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { Pen, Trash2 } from 'lucide-react';

const API_URL = 'http://localhost:8080/jobs'; // Change at production

const CustomCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': { fontSize: 28 },
  '&.Mui-checked': {
    color: '#48b574',
  },
});

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
  const [isAdding, setIsAdding] = useState(false);
  const [newListing, setNewListing] = useState<Listing>({
    title: '',
    company: '',
    description: '',
    applied: false,
    status: 'red',
    applicationDate: '',
    interviewDate: '',
    offerDate: '',
    tags: [],
  });

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

  const handleAddListing = async (data: Listing) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newData = await response.json();
      setListings((prevListings) => [newData, ...prevListings]);
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleStatusClick = () => {
    const nextStatus = newListing.status === 'red' ? 'yellow' : newListing.status === 'yellow' ? 'green' : 'red';
    setNewListing({ ...newListing, status: nextStatus });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Listing>();

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
        pages = [1, 2, 3, 4, '...', count];
      } else if (page >= count - 2) {
        pages = [1, '...', count - 3, count - 2, count - 1, count];
      } else {
        pages = [1, '...', page - 1, page, page + 1, '...', count];
      }
    }

    return pages;
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'green':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleApply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewListing({ ...newListing, applied: event.target.checked });
  };

  return (
    <div className="flex flex-col h-full overflow-y-hidden">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow overflow-y-hidden">
          {isAdding && (
            <div>
              <form onSubmit={handleSubmit(handleAddListing)}>
                <div className="relative mx-10 mt-8">
                  <div className="flex flex-row items-center justify-between bg-main-gray px-4 py-6 rounded-2xl shadow-2xl w-full">
                    <div className="flex items-center justify-center flex-1">
                      <p className="text-xl font-medium ml-6">INPUT</p>
                    </div>
                    <div className="flex items-center justify-center flex-1">
                      <p className="text-xl font-medium ml-4">COMPANY</p>
                    </div>
                    <div className="flex items-center justify-center flex-1 ml-2">
                      <div className={`flex items-center justify-center rounded-full w-8 h-8 ml-1 shadow-xl`}></div>
                    </div>
                    <div className="flex items-center justify-center flex-1 mr-4">
                      <CustomCheckbox
                        onChange={handleApply}
                        inputProps={{ 'aria-label': 'controlled' }}
                        className="ml-1.5"
                      />
                    </div>
                    <div className="absolute right-3 flex items-center space-x-1">
                      <button className="flex items-center justify-center bg-main-green hover:bg-green-200 rounded-full p-2 shadow-lg">
                        <Pen size={20} />
                      </button>
                      <button className="flex items-center justify-center bg-red-400 hover:bg-red-300 rounded-full p-2 shadow-lg">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center w-full">
                      <div className="bg-main-gray bg-opacity-95 rounded-b-2xl shadow-2xl w-[98%] p-4">
                        <div className="grid grid-cols-3 h-full">
                          <div>
                            <h1 className="text-lg font-semibold">Note:</h1>
                            <p>DESC</p>
                          </div>

                          <div className="grid grid-cols-2 h-full">
                            <div className="text-md font-medium space-y-10">
                              <p>Application Date:</p>
                              <p>Interview Date:</p>
                              <p>Offer Date:</p>
                            </div>

                            <div className="space-y-10">
                              <p>{'N/A'}</p>
                              <p>{'N/A'}</p>
                              <p>{'N/A'}</p>
                            </div>
                          </div>

                          <div>
                            <h1 className="text-lg font-medium">Tags:</h1>
                            {/* {tags && (
                                  <div className="flex flex-wrap mt-2">
                                    {tags.map((tag, index) => (
                                      <span key={index} className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mt-2">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
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
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          if (isAdding) {
            handleAddListing(newListing);
          } else {
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
