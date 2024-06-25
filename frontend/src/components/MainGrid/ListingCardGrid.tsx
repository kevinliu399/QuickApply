import React, { useState, useEffect } from 'react';
import { Fab, Pagination, PaginationItem, Checkbox, TextField, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import ListingCard from './ListingCard';
import ProgressBar from './ProgressBar';
import './maingrid.css';

const API_URL = 'http://localhost:8080/jobs'; // Change at production
const API_URL_FOR_TAGS = 'http://localhost:8080/jobs/tags'; // Change at production

const CustomCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': { fontSize: 28 },
  '&.Mui-checked': {
    color: '#48b574',
  },
});

interface Listing {
  id: string;
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

const statusColor = (status: string) => {
  switch (status) {
    case 'Decision':
      return 'bg-red-300';
    case 'Interview':
      return 'bg-yellow-200';
    case 'Applied':
      return 'bg-green-300';
    default:
      return 'bg-neutral-500';
  }
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ListingCardGrid: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage, setListingsPerPage] = useState(10);
  const [isAdding, setIsAdding] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [isCustomTag, setIsCustomTag] = useState(false);
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});

  const { register, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm<Listing>({
    defaultValues: {
      title: '',
      company: '',
      description: '',
      applied: false,
      applicationDate: '',
      interviewDate: '',
      offerDate: '',
      tags: [],
      status: 'Watching',
    },
  });

  const watchedStatus = watch('status', 'Watching');
  const watchedApplied = watch('applied', false);

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

    const fetchTags = async () => {
      try {
        const response = await fetch(API_URL_FOR_TAGS);
        const data = await response.json();
        setAllTags(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setAllTags([]);
      }
    };

    fetchTags();

    updateListingsPerPage();
    window.addEventListener('resize', updateListingsPerPage);

    return () => window.removeEventListener('resize', updateListingsPerPage);
  }, []);

  useEffect(() => {
    // Pre-generate colors for all tags
    const initialTagColors = allTags.reduce((acc, tag) => {
      acc[tag] = generateRandomColor();
      return acc;
    }, {} as { [key: string]: string });
    setTagColors(initialTagColors);
  }, [allTags]);

  const handleAddListing = async (data: Listing) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, tags: selectedTags }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newData = await response.json();
      setListings((prevListings) => [newData, ...prevListings]);
      setIsAdding(false);
      reset();
      setSelectedTags([]);
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    reset();
    setSelectedTags([]);
    setIsCustomTag(false);
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const statuses = ['Watching', 'Applied', 'Interview', 'Decision'];
    const currentStatus = getValues('status') || 'Watching';
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    setValue('status', nextStatus);
  };

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

  const handleApply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('applied', event.target.checked);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(event.target.value);
  };

  const handleTagKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInputValue.trim() !== '') {
      event.preventDefault();
      if (!selectedTags.includes(tagInputValue.trim())) {
        setSelectedTags([...selectedTags, tagInputValue.trim()]);
      }
      setTagInputValue('');
      setIsCustomTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === '+ Custom Tag') {
      setIsCustomTag(true);
    } else {
      setIsCustomTag(false);
      if (!selectedTags.includes(value)) {
        setSelectedTags([...selectedTags, value]);
      }
    }
  };

  const getTagColor = (tag: string) => {
    return tagColors[tag] || generateRandomColor();
  };

  return (
    <div className="Job-Container flex flex-col h-full overflow-y-scroll">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow">
          {isAdding && (
            <div>
              <form onSubmit={handleSubmit(handleAddListing)}>
                <div className="relative mx-10 mt-8">
                  <div className="flex flex-row items-center justify-between bg-main-gray px-4 py-6 rounded-2xl shadow-2xl w-full">
                    <div className="flex items-center justify-center flex-1">
                      <div className="text-xl ml-6 border-b-2 border-b-black">
                        <input className="bg-main-gray focus:outline-none focus:border-none ml-2" type="text" placeholder="Software Developer" {...register('title')} />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-1">
                      <div className="text-xl ml-6 border-b-2 border-b-black">
                        <input className="bg-main-gray focus:outline-none focus:border-none ml-2" type="text" placeholder="Google" {...register('company')} />
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 ml-2">
                      <div className="flex items-center justify-center rounded-full w-8 h-8 ml-1 shadow-xl">
                        <button type="button" onClick={handleStatusClick} className={`rounded-full w-8 h-8 ${statusColor(watchedStatus as string)}`}></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 mr-4">
                      <CustomCheckbox
                        onChange={handleApply}
                        inputProps={{ 'aria-label': 'controlled' }}
                        className="ml-1.5"
                        checked={watchedApplied}
                      />
                    </div>
                    <div className="absolute right-3 flex items-center">
                      <button type="button" className="flex items-center justify-center bg-red-400 hover:bg-red-300 rounded-full p-2 shadow-2xl" onClick={handleCancel}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center w-full">
                      <div className="bg-main-gray bg-opacity-95 rounded-b-2xl shadow-2xl w-[98%] p-4">
                        <div className="grid grid-cols-4">
                          <div>
                            <h1 className="text-lg font-semibold">Note:</h1>
                            <textarea
                              className="rounded-md bg-white shadow-md p-2 focus:border-none focus:outline focus:outline-main-green ml-2 mt-2"
                              maxLength={99}
                              style={{ resize: 'none', width: '80%', height: '100px' }}
                              {...register('description')}
                            />
                          </div>
                          <div className="grid grid-cols-2 h-full">
                            <div className="text-md font-medium space-y-10">
                              <p>Application Date:</p>
                              <p>Interview Date:</p>
                              <p>Offer Date:</p>
                            </div>
                            <div className="space-y-10">
                              <input type="date" className="w-[150px] h-[30px] rounded-md shadow-md focus:outline-none focus:border-none px-2" {...register('applicationDate')} />
                              <input type="date" className="w-[150px] h-[30px] rounded-md shadow-md focus:outline-none focus:border-none px-2" {...register('interviewDate')} />
                              <input type="date" className="w-[150px] h-[30px] rounded-md shadow-md focus:outline-none focus:border-none px-2" {...register('offerDate')} />
                            </div>
                          </div>
                          <div className="mt-2">
                            <ProgressBar status={watchedStatus} />
                          </div>
                          <div>
                            <h1 className="text-lg font-medium">Tags:</h1>
                            <div className="tag-input-container">
                              {isCustomTag ? (
                                <input
                                  value={tagInputValue}
                                  onChange={handleTagInputChange}
                                  onKeyPress={handleTagKeyPress}
                                  placeholder="Enter new tag"
                                  className="rounded-md bg-white shadow-md p-2 focus:border-none focus:outline focus:outline-main-green"
                                />
                              ) : (
                                <Select
                                  value=""
                                  onChange={handleTagChange}
                                  displayEmpty
                                >
                                  <MenuItem value="" disabled>
                                    Add a tag
                                  </MenuItem>
                                  <MenuItem value="+ Custom Tag">+ Custom Tag</MenuItem>
                                  {allTags.map((tag, index) => (
                                    <MenuItem key={index} value={tag}>
                                      {tag}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                              <div className="w-full">
                                <div className="tag-list flex flex-wrap space-x-2 w-full ">
                                  {selectedTags.map((tag, index) => (
                                    <div key={index} className="tag-item text-main-black rounded-full px-3 py-1 text-sm mt-2" style={{ backgroundColor: getTagColor(tag) }}>
                                      <button className="hover:line-through" onClick={() => handleRemoveTag(tag)}>{tag}</button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          {currentListings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              company={listing.company}
              description={listing.description}
              status={listing.status}
              applied={listing.applied}
              applicationDate={listing.applicationDate}
              interviewDate={listing.interviewDate}
              offerDate={listing.offerDate}
              tags={listing.tags}
              tagColors={tagColors}
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
            handleSubmit(handleAddListing)();
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
