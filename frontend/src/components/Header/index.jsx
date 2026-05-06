import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { FaWallet, FaUserCircle } from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './styles.css';

function Header({ toggleTheme, mode, isAuthenticated, onLogout, currentUser }) {
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
              color: 'text.primary',
              textDecoration: 'none'
            }}
            component={Link}
            to={isAuthenticated ? "/dashboard" : "/"}
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

        {isAuthenticated && (
          <Box display="flex" alignItems="center">
            {currentUser && (
              <Box 
                display="flex" 
                alignItems="center" 
                sx={{ 
                  mr: 3, 
                  px: 2, 
                  py: 0.75, 
                  borderRadius: '24px', 
                  backgroundColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.15)' : 'rgba(25, 118, 210, 0.1)',
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.3)' : 'rgba(25, 118, 210, 0.3)'
                }}
              >
                <FaUserCircle size={20} style={{ marginRight: '8px' }} />
                <Typography variant="body2" fontWeight="700" letterSpacing="0.5px">
                  {currentUser.name.toUpperCase()}
                </Typography>
              </Box>
            )}
            <Button 
              component={Link}
              to="/dashboard"
              color="inherit"
              sx={{ color: mode === 'dark' ? 'inherit' : 'primary.dark' }}
            >
              Dashboard
            </Button>
            <Button 
              component={Link}
              to="/transactions"
              color="inherit"
              sx={{ color: mode === 'dark' ? 'inherit' : 'primary.dark' }}
            >
              Transações
            </Button>
            <Button 
              color="inherit"
              sx={{ marginLeft: 2, color: mode === 'dark' ? 'inherit' : 'primary.dark' }}
              onClick={onLogout}
            >
              Sair
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;