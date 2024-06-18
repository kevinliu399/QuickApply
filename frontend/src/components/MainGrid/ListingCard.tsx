import React, { useState } from 'react';
import { Box, Typography, Checkbox, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import './font.css';

interface ListingCardProps {
  title: string;
  company: string;
  isChecked: boolean;
  isEditing: boolean;
  color: 'red' | 'green' | 'yellow'; // New prop for color
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    transition: 'border-bottom 1s ease',
  },
  '& .MuiInput-underline:after': {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    transition: 'border-bottom 1s ease',
  },
}));

const colorMap = {
  red: '#EC3737',
  green: '#67FFA4',
  yellow: '#EAFF67',
};

const ListingCard: React.FC<ListingCardProps> = ({ title, company, isChecked: initialChecked, isEditing: initialEditing, color }) => {
  const [isEditing, setIsEditing] = useState(initialEditing);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedCompany, setEditedCompany] = useState(company);
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = () => {
    // Here you would typically delete the listing from the server or state
  }

  const handleSaveClick = () => {
    // Here you would typically save the changes to the server or state
    setIsEditing(false);
  };

  return (
    <Box mx={10} mt={4.5} position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#D9D9D9"
        p={1}
        borderRadius={5}
        width="100%"
        height={70}
        position="relative"
        sx={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',}}
      >
        {isEditing ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '80%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '10px',
                  height: '100%',
                  backgroundColor: '#D9D9D9',
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '10px',
                  height: '100%',
                  backgroundColor: '#D9D9D9',
                  zIndex: 1,
                }}
              />
              <StyledTextField
                variant="standard"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                sx={{ flex: 1 }}
                inputProps={{ sx: { textAlign: 'center' }, maxLength: 28 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '80%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '10px',
                  height: '100%',
                  backgroundColor: '#D9D9D9',
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '10px',
                  height: '100%',
                  backgroundColor: '#D9D9D9',
                  zIndex: 1,
                }}
              />
              <StyledTextField
                variant="standard"
                value={editedCompany}
                onChange={(e) => setEditedCompany(e.target.value)}
                sx={{ flex: 1, zIndex: 0 }}
                inputProps={{ sx: { textAlign: 'center' }, maxLength: 20 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: colorMap[color],
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  ml: 1,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Checkbox
                sx={{
                  color: 'gray',
                  ml: 1.5,
                  '&.Mui-checked': {
                    color: 'gray',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  },
                }}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Typography className="rubik" variant="body1" sx={{  textAlign: 'center', fontWeight: 600, color: '#3D3D3D', fontSize: 15, maxWidth: 190, textOverflow: 'ellipsis',whiteSpace: 'nowrap',
                overflow: 'hidden',}}>{editedTitle}</Typography>

            </Box>
            
            <Typography 
              className="rubik" 
              variant="body1" 
              sx={{ 
                flex: 1, 
                textAlign: 'center', 
                fontWeight: 600, 
                color: '#3D3D3D', 
                fontSize: 15,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%' 
              }}
            >
              {editedCompany}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: colorMap[color],
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  ml: 1,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Checkbox
                sx={{
                  color: 'gray',
                  ml: 1.5,
                  '&.Mui-checked': {
                    color: 'gray',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '& .MuiTouchRipple-root': {
                    display: 'none',
                  },
                  cursor: 'default',
                  transition: 'none'
                }}
                checked={isChecked}
                readOnly
              />
            </Box>
          </>
        )}

        <Box
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={isEditing ? handleSaveClick : handleEditClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#64CEBB',
              borderRadius: '50%',
              width: 19,
              height: 19,
              ml: 1,
            }}
          >
            {isEditing ? <CheckIcon sx={{ maxWidth: 12, ml: '0.79px' }} /> : <EditIcon sx={{ maxWidth: 12, ml: '0.79px' }} />}
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#B76767',
              borderRadius: '50%',
              width: 19,
              height: 19,
              ml: 1,
            }}
          >
            <CloseIcon onClick={handleDeleteClick}  sx={{ maxWidth: 16, ml: '0.8px', cursor: 'pointer'}} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
