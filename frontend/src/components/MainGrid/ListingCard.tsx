import React, { useEffect, useState, useRef } from 'react';
import { Checkbox } from '@mui/material';
import { Check, Trash2, Pen } from 'lucide-react';
import { styled } from '@mui/system';
import { ArrowDownNarrowWide } from 'lucide-react';
import './maingrid.css';

const CustomCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': { fontSize: 28 },
  '&.Mui-checked': {
    color: '#48b574',
  },
});

interface ListingCardProps {
  title?: string;
  company?: string;
  description?: string;
  status?: string;
  applicationDate?: string;
  interviewDate?: string;
  offerDate?: string;
  tags?: string[];
  applied?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ title, company, description, status, applicationDate, interviewDate, offerDate, tags }) => {
  const [applied, setApplied] = useState(false);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleApply = () => {
    setApplied(!applied);
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
      <div
        className="flex items-center justify-between bg-main-gray p-4 rounded-2xl shadow-2xl w-full"
      >
        <div className="flex items-center justify-center flex-1">
          <p className="text-xl font-medium ml-6">{title}</p>
        </div>
        <div className="flex items-center justify-center flex-1">
          <p className="text-xl font-medium ml-4">{company}</p>
        </div>
        <div className="flex items-center justify-center flex-1 ml-2">
          <div className={`flex items-center justify-center rounded-full w-8 h-8 ml-1 shadow-xl ${statusColor(status)}`}></div>
        </div>
        <div className="flex items-center justify-center flex-1 mr-4">
          <CustomCheckbox
            checked={applied}
            onChange={handleApply}
            inputProps={{ 'aria-label': 'controlled' }}
            className="ml-1.5"
          />
        </div>
        <div className="absolute right-5 flex items-center space-x-3 mx-2">
          <button className="flex items-center justify-center bg-main-green hover:bg-green-200 rounded-full p-2 shadow-lg">
            <Pen size={20} />
          </button>
          <button className="flex items-center justify-center bg-red-400 hover:bg-red-300 rounded-full p-2 shadow-lg">
            <Trash2 size={20} />
          </button>
          <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-full p-2 shadow-lg" onClick={toggleDetailCard}>
            <ArrowDownNarrowWide size={20} />
          </button>
        </div>
      </div>
      <div className={`detail-card ${showDetailCard ? 'show' : ''}`}>
        <div className="flex justify-center w-full">
          <div className="bg-main-gray bg-opacity-95 rounded-b-2xl shadow-2xl w-[98%] h-[200px] p-4">
            <div className="grid grid-cols-3 h-full">
              <div>
                <h1 className="text-lg font-semibold">Note:</h1>
                <p>{description}</p>
              </div>

              <div className="grid grid-cols-2 h-full">
                <div className="text-md font-medium space-y-10">
                  <p>
                    Application Date:
                  </p>
                  <p>
                    Interview Date:
                  </p>
                  <p>
                    Offer Date:
                  </p>
                </div>

                <div className="space-y-10">
                  <p>
                    {applicationDate || 'N/A'}
                  </p>
                  <p>
                    {interviewDate || 'N/A'}
                  </p>
                  <p>
                    {offerDate || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-medium">Tags:</h1>
                {tags && (
                  <div className="flex flex-wrap mt-2">
                    {tags.map((tag, index) => (
                      <span key={index} className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mt-2">
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

const statusColor = (status: string | undefined) => {
  switch (status) {
    case 'WATCHING':
      return 'bg-gray-200';
    case 'APPLIED':
      return 'bg-green-200';
    case 'INTERVIEWING':
      return 'bg-yellow-200';
    case 'REJECTED':
      return 'bg-red-200';
    default:
      return 'bg-gray-200';
  }
};

export default ListingCard;
