import React from 'react';
import { Box, Typography } from '@mui/material';
import './maingrid.css';

const HeaderTable: React.FC = () => {
  return (
    <Box mx={10} mt={3}>
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          bgcolor="#303030"
          borderRadius={1}
        >
          <Typography className="rubik" sx={{ color: '#fff', flex: 1, textAlign: 'center', fontSize: 15 }}>Title</Typography>
          <Typography className="rubik" sx={{ color: '#fff', flex: 1, textAlign: 'center', fontSize: 15 }}>Company</Typography>
          <Typography className="rubik" sx={{ color: '#fff', flex: 1, textAlign: 'center', fontSize: 15 }}>Status</Typography>
          <Typography className="rubik" sx={{ color: '#fff', flex: 1, textAlign: 'center', fontSize: 15 }}>Applied</Typography>
        </Box>

      <Box
          sx={{
            borderBottom: '1px solid #666',
            width: '100%',
            mt: 1,
            mb: 3,
          }}
        />
    </Box>
  );
};

export default HeaderTable;
