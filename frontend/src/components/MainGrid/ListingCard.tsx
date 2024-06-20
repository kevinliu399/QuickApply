import React, { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import { Check, X, Pen } from 'lucide-react'
import { styled } from '@mui/system';

const CustomCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': { fontSize: 28 }, 
  '&.Mui-checked': {
    color: '#48b574',
  },
});

interface ListingCardProps {
  title?: string;
  companyName?: string;
  description?: string;
  status?: string;
  // POSSIBILITIES FOR STATUS LEGEND
  // WATCHING => GRAY
  // APPLIED => GREEN
  // INTERVIEWING => YELLOW
  // REJECTED => RED

  isApplied?: boolean;

  // double check for type
  applicationDate?: string;
  interviewDate?: string;
  offerDate?: string;
  tags?: string[];
}

const ListingCard: React.FC<ListingCardProps> = ({ title, companyName, description, status, isApplied }) => {
  const [applied, setApplied] = useState(false);

  // useEffect(() => {
  //   setApplied(isApplied);
  // }, [isApplied]);

  const handleApply = () => {
    setApplied(!applied);
  };

  return (
    <div className="py-8 px-16">
      <div className="p-2 my-4 bg-main-gray rounded-2xl shadow-2xl">
        <div className="flex flex-row">
          <div className="flex-1">
            <div className="flex flex-row justify-evenly space-x-28 h-[100px] w-full items-center">
              <div>
                <h1 className="text-xl font-medium">Temporary Title</h1>
              </div>
              <div>
                <h1 className="text-xl font-medium">Google</h1>
              </div>
              <div>
                <button className="p-5 rounded-full bg-green-200 shadow-xl"> </button>
              </div>
              <div className="flex items-center">
                <CustomCheckbox
                  checked={applied}
                  onChange={handleApply}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
          </div>

          <div className="flex-none px-4">
            <div className="flex flex-row space-x-2 h-full items-center">
              <div>
                <button className="p-2 shadow-md bg-main-green rounded-full">
                  <Pen size={20}></Pen>
                </button>
              </div>
              <div>
                <button className="p-2 shadow-md bg-red-400 rounded-full">
                  <X size={20}></X>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ListingCard;
