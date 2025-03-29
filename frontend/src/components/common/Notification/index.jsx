import React from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import { Check, Error, Warning, Info } from '@mui/icons-material';

function Notification({ open, message, severity, onClose }) {
  const getIcon = () => {
    switch (severity) {
      case 'success': return <Check />;
      case 'error': return <Error />;
      case 'warning': return <Warning />;
      case 'info': return <Info />;
      default: return <Info />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        mt: 6,
        '& .MuiPaper-root': {
          minWidth: '300px',
          maxWidth: '600px'
        }
      }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        icon={getIcon()}
        sx={{
          width: '100%',
          alignItems: 'center',
          fontSize: '1rem',
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
            marginRight: '12px',
            padding: '4px 0'
          },
          animation: 'slideDown 0.5s ease-out',
          '@keyframes slideDown': {
            from: {
              transform: 'translateY(-100%)',
              opacity: 0
            },
            to: {
              transform: 'translateY(0)',
              opacity: 1
            }
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {message}
        </Box>
      </Alert>
    </Snackbar>
  );
}

export default Notification;
