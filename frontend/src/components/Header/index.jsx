import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { FaWallet } from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import './styles.css';

function Header({ toggleTheme, mode }) {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <FaWallet 
            size={24} 
            style={{ 
              marginRight: '10px',
              color: mode === 'dark' ? '#90caf9' : '#1976d2'
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 500,
              letterSpacing: '0.5px',
              color: 'text.primary'
            }}
          >
            Gerenciador Financeiro
          </Typography>
        </Box>
        
        <IconButton 
          onClick={toggleTheme} 
          sx={{ 
            mr: 2,
            color: mode === 'dark' ? 'text.secondary' : 'primary.dark',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: mode === 'dark' 
                ? 'rgba(144, 202, 249, 0.08)' 
                : 'rgba(25, 118, 210, 0.08)',
            }
          }}
        >
          {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
        </IconButton>

        <Button 
          color="inherit" 
          sx={{ 
            marginLeft: 2,
            color: mode === 'dark' ? 'inherit' : 'primary.dark',
            '&:hover': {
              color: mode === 'dark' ? 'primary.main' : 'primary.main',
            }
          }}
        >
          Login
        </Button>
        <Button 
          color="inherit"
          sx={{ 
            marginLeft: 1,
            color: mode === 'dark' ? 'inherit' : 'primary.dark',
            '&:hover': {
              color: mode === 'dark' ? 'primary.main' : 'primary.main',
            }
          }}
        >
          Registrar
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
