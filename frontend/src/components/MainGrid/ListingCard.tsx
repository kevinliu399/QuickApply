import React, { useEffect, useState, useRef, useContext } from 'react';
import { Checkbox } from '@mui/material';
import { Trash2, Pen, ArrowDownNarrowWide } from 'lucide-react';
import { styled } from '@mui/system';
import ProgressBar from './ProgressBar';
import './maingrid.css';
import { AuthContext } from '../../context/AuthContext';

const CustomCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': { fontSize: 28 },
  '&.Mui-checked': {
    color: '#48b574',
  },
});

const API_URL = 'http://localhost:8080/jobs';

interface ListingCardProps {
  id: string;
  title?: string;
  company?: string;
  description?: string;
  status?: string;
  applicationDate?: string;
  interviewDate?: string;
  offerDate?: string;
  tags?: string[];
  applied?: boolean;
  tagColors: { [key: string]: string };
}

const ListingCard: React.FC<ListingCardProps> = ({ id, title, company, description, status, applicationDate, interviewDate, offerDate, tags, applied, tagColors }) => {
  const [isApplied, setIsApplied] = useState(applied || false);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { user } = useContext(AuthContext);

  const deleteListing = async () => {
    if (user && user.accessToken) {
      const getHeaders = () => {
        return {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
          userId: user.id,
        };
      };

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: getHeaders(),
        });

        if (response.ok) {
          console.log('Listing deleted successfully');
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error deleting listings:', error);
      }
    }
  };

  const toggleDetailCard = () => {
    setShowDetailCard(!showDetailCard);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setShowDetailCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mx-10 mt-8" ref={cardRef}>
      <div className="flex items-center justify-between bg-main-gray px-4 py-6 rounded-2xl shadow-2xl w-full">
        <div className="flex items-center justify-center flex-1">
          <p className="text-xl font-medium ml-6">{title}</p>
        </div>
        <div className="flex items-center justify-center flex-1">
          <p className="text-xl font-medium ml-4">{company}</p>
        </div>
        <div className="flex items-center justify-center flex-1 ml-2">
          <div className={`flex items-center justify-center rounded-full w-8 h-8 ml-1 shadow-xl ${statusColor(status as string)}`}></div>
        </div>
        <div className="flex items-center justify-center flex-1 mr-4">
          <CustomCheckbox
            checked={isApplied}
            disabled
            inputProps={{ 'aria-label': 'controlled' }}
            className="ml-1.5"
          />
        </div>
        <div className="absolute right-3 flex items-center space-x-1">
          <button className="flex items-center justify-center bg-main-green hover:bg-green-200 rounded-full p-2 shadow-lg">
            <Pen size={20} />
          </button>
          <button className="flex items-center justify-center bg-red-400 hover:bg-red-300 rounded-full p-2 shadow-lg" onClick={deleteListing}>
            <Trash2 size={20} />
          </button>
          <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-full p-2 shadow-lg" onClick={toggleDetailCard}>
            <ArrowDownNarrowWide size={20} />
          </button>
        </div>
      </div>
      <div className={`detail-card ${showDetailCard ? 'show' : ''}`}>
        <div className="flex justify-center w-full">
          <div className="bg-main-gray bg-opacity-95 rounded-b-2xl shadow-2xl w-[98%] p-4">
            <div className="grid grid-cols-4 h-full">
              <div>
                <h1 className="text-lg font-semibold">Note:</h1>
                <p className="ml-2">{description}</p>
              </div>
              <div className="grid grid-cols-2 h-full">
                <div className="text-md font-medium space-y-10">
                  <p>Application Date:</p>
                  <p>Interview Date:</p>
                  <p>Offer Date:</p>
                </div>
                <div className="space-y-10">
                  <p>{applicationDate || 'N/A'}</p>
                  <p>{interviewDate || 'N/A'}</p>
                  <p>{offerDate || 'N/A'}</p>
                </div>
              </div>
              <div className="mt-2">
                <ProgressBar status={status} /> {/* Add ProgressBar */}
              </div>
              <div>
                <h1 className="text-lg font-medium">Tags:</h1>
                {tags && (
                  <div className="flex flex-wrap mt-2">
                    {tags.map((tag, index) => (
                      <span key={index} className="text-main-black rounded-full px-3 py-1 text-sm mr-2 mt-2" style={{ backgroundColor: tagColors[tag] }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default ListingCard;
