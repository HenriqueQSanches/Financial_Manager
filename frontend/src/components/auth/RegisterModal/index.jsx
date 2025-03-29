import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import './styles.css';

function RegisterModal({ open, onClose, theme }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const modalRef = useRef(null);

  const handleScroll = () => {
    if (modalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      setShowScrollIndicator(!isAtBottom);
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      const hasScroll = modalElement.scrollHeight > modalElement.clientHeight;
      setShowScrollIndicator(hasScroll);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} className="modal-overlay">
      <Box
        ref={modalRef}
        className="login-modal"
        onScroll={handleScroll}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          maxHeight: {
            xs: '90vh', 
            sm: '80vh'  
          },
          width: {
            xs: '90%',  
            sm: '400px' 
          },
          overflow: 'auto',
          m: 2,
          p: {
            xs: 2,
            sm: 3
          },
          '& .MuiTextField-root': {
            my: 1
          },
          '& .MuiButton-root': {
            my: 1
          },
          position: 'relative',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          paddingBottom: showScrollIndicator ? '60px' : '24px',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Criar uma conta
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Preencha os dados abaixo para começar a gerenciar suas finanças.
        </Typography>
        <TextField
          label="Nome"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '16px', padding: '10px' }}
        >
          Registrar
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ 
            marginTop: '8px', 
            padding: '10px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <GoogleIcon />
          Registrar com Google
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          sx={{ marginTop: '8px' }}
          onClick={onClose}
        >
          Cancelar
        </Button>
        {showScrollIndicator && (
          <div 
            className="scroll-indicator"
            style={{ 
              borderColor: theme.palette.mode === 'dark' 
                ? theme.palette.common.white 
                : theme.palette.common.black,
              opacity: 0.8
            }}
            aria-hidden="true"
          />
        )}
      </Box>
    </Modal>
  );
}

export default RegisterModal;
