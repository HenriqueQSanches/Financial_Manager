import React, { useState, useMemo } from 'react';
import { Button, ThemeProvider, createTheme, CssBaseline, Paper } from '@mui/material';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Header from './components/Header';
import './styles/global.css';

function App() {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#f50057',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f5f5',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#000000',
            secondary: mode === 'dark' ? '#bdbdbd' : '#666666',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                transition: 'all 0.3s ease',
              },
              contained: {
                backgroundColor: mode === 'dark' ? '#90caf9' : '#1976d2',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? '#42a5f5' : '#1565c0',
                },
              },
              outlined: {
                borderColor: mode === 'dark' ? '#90caf9' : '#1976d2',
                color: mode === 'dark' ? '#90caf9' : '#1976d2',
                '&:hover': {
                  borderColor: mode === 'dark' ? '#42a5f5' : '#1565c0',
                  backgroundColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper 
        sx={{ 
          minHeight: '100vh',
          borderRadius: 0,
          bgcolor: 'background.default'
        }}
      >
        <Header toggleTheme={toggleTheme} mode={mode} />
        <div className="hero-section">
          <h1 style={{ color: theme.palette.primary.main }}>
            Bem-vindo ao Gerenciador Financeiro
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Uma solução simples e eficiente para gerenciar suas finanças pessoais.
            Controle seus gastos, acompanhe suas receitas e tome decisões financeiras
            mais inteligentes.
          </p>
          <div className="action-buttons">
            <Button
              variant="contained"
              startIcon={<FaSignInAlt />}
              onClick={() => alert('Ir para Login')}
              sx={{ 
                fontSize: '1rem',
                padding: '8px 24px',
                borderRadius: '8px',
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaUserPlus />}
              onClick={() => alert('Ir para Registro')}
              sx={{ 
                fontSize: '1rem',
                padding: '8px 24px',
                borderRadius: '8px',
              }}
            >
              Registrar
            </Button>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
