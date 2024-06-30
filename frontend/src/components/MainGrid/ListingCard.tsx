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

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  company,
  description,
  status,
  applicationDate,
  interviewDate,
  offerDate,
  tags,
  applied,
  tagColors
}) => {
  const [isApplied, setIsApplied] = useState(applied || false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [formData, setFormData] = useState({
    title: title || '',
    company: company || '',
    description: description || '',
    status: status || '',
    applicationDate: applicationDate || '',
    interviewDate: interviewDate || '',
    offerDate: offerDate || '',
    tags: tags || [],
    applied: applied || false,
  });
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

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
    setFormData({
      title: title || '',
      company: company || '',
      description: description || '',
      status: status || '',
      applicationDate: applicationDate || '',
      interviewDate: interviewDate || '',
      offerDate: offerDate || '',
      tags: tags || [],
      applied: applied || false,
    });
    console.log('Editing:', isEditing);
  };

  const toggleDetailCard = () => {
    setShowDetailCard(!showDetailCard);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = () => {
    const newStatus = formData.status === 'Applied' ? 'Interview' : formData.status === 'Interview' ? 'Decision' : 'Applied';
    setFormData({ ...formData, status: newStatus });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, applied: !formData.applied });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Listing updated successfully');
          setIsEditing(false);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error updating listing:', error);
      }
    }
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
          {isEditing ? (
            <input
              className="bg-main-gray focus:outline-none focus:border-none ml-2 text-xl font-medium"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-xl font-medium ml-6">{title}</p>
          )}
        </div>
        <div className="flex items-center justify-center flex-1">
          {isEditing ? (
            <input
              className="bg-main-gray focus:outline-none focus:border-none ml-2 text-xl font-medium"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-xl font-medium ml-4">{company}</p>
          )}
        </div>
        <div className="flex items-center justify-center flex-1 ml-2">
          {isEditing ? (
            <button type="button" onClick={handleStatusChange} className={`rounded-full w-8 h-8 ${statusColor(formData.status)}`}></button>
          ) : (
            <div className={`flex items-center justify-center rounded-full w-8 h-8 ml-1 shadow-xl ${statusColor(status as string)}`}></div>
          )}
        </div>
        <div className="flex items-center justify-center flex-1 mr-4">
          {isEditing ? (
            <CustomCheckbox
              checked={formData.applied}
              onChange={handleCheckboxChange}
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-1.5"
            />
          ) : (
            <CustomCheckbox
              checked={isApplied}
              disabled
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-1.5"
            />
          )}
        </div>
        <div className="absolute right-3 flex items-center space-x-1">
          <button className="flex items-center justify-center bg-main-green hover:bg-green-200 rounded-full p-2 shadow-lg" onClick={toggleEditForm}>
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
            {isEditing ? (
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-4">
                  <div>
                    <h1 className="text-lg font-semibold">Note:</h1>
                    <textarea
                      name="description"
                      className="rounded-md bg-white shadow-md p-2 focus:border-none focus:outline focus:outline-main-green ml-2 mt-2"
                      maxLength={99}
                      style={{ resize: 'none', width: '80%', height: '100px' }}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 h-full">
                    <div className="text-md font-medium space-y-10">
                      <p>Application Date:</p>
                      <p>Interview Date:</p>
                      <p>Offer Date:</p>
                    </div>
                    <div className="space-y-10">
                      <input
                        type="date"
                        name="applicationDate"
                        className="w-[150px] h-[30px] rounded-md shadow-md focus:outline-main-green focus:border-none px-2"
                        value={formData.applicationDate || ''}
                        onChange={handleInputChange}
                      />
                      <input
                        type="date"
                        name="interviewDate"
                        className="w-[150px] h-[30px] rounded-md shadow-md focus:outline-main-green focus:border-none px-2"
                        value={formData.interviewDate || ''}
                        onChange={handleInputChange}
                      />
                      <input
                        type="date"
                        name="offerDate"
                        className="w-[150px] h-[30px] rounded-md shadow-md focus:outline-main-green focus:border-none px-2"
                        value={formData.offerDate || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <ProgressBar status={formData.status} />
                  </div>
                  <div>
                    <h1 className="text-lg font-medium">Tags:</h1>
                    <div className="tag-input-container">
                      {/* Add tag input handling here */}
                    </div>
                  </div>
                </div>
                <button type="submit" className="mt-4 bg-main-green hover:bg-green-200 rounded-full p-2 shadow-lg">Save</button>
              </form>
            ) : (
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
                  <ProgressBar status={status} />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
