import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Paper } from '@mui/material';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';
import Notification from './components/common/Notification';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

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
                  backgroundColor: mode === 'dark'
                    ? 'rgba(144, 202, 249, 0.08)'
                    : 'rgba(25, 118, 210, 0.08)',
                },
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              standardSuccess: {
                backgroundColor: mode === 'dark' ? '#2e7d32' : '#e8f5e9',
                color: mode === 'dark' ? '#fff' : '#1b5e20'
              },
              standardError: {
                backgroundColor: mode === 'dark' ? '#d32f2f' : '#ffebee',
                color: mode === 'dark' ? '#fff' : '#c62828'
              },
              filledSuccess: {
                backgroundColor: mode === 'dark' ? '#2e7d32' : '#43a047',
              },
              filledError: {
                backgroundColor: mode === 'dark' ? '#d32f2f' : '#e53935',
              },
            }
          },
          MuiSnackbar: {
            styleOverrides: {
              root: {
                '& .MuiAlert-filledSuccess': {
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                },
                '& .MuiAlert-filledError': {
                  boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
                },
              }
            }
          }
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const navigate = useNavigate();

  const handleLoginSuccess = (msg = 'Login efetuado com sucesso!') => {
    setLoginModalOpen(false);
    setIsAuthenticated(true);
    showNotification(msg);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
    showNotification('Logout efetuado com sucesso!');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          minHeight: '100vh',
          borderRadius: 0,
          bgcolor: 'background.default',
        }}
      >
        <Header
          toggleTheme={toggleTheme}
          mode={mode}
          onLoginClick={() => setLoginModalOpen(true)}
          onRegisterClick={() => setRegisterModalOpen(true)}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                theme={theme}
                onLoginClick={() => setLoginModalOpen(true)}
                onRegisterClick={() => setRegisterModalOpen(true)}
              />
            }
          />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <LoginModal
          open={isLoginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          theme={theme}
          onSuccess={handleLoginSuccess}
        />
        <RegisterModal
          open={isRegisterModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          theme={theme}
          onSuccess={(message) => {
            setRegisterModalOpen(false);
            showNotification(message);
          }}
        />
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
