import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import './styles.css';

function LoginModal({ open, onClose, theme }) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Modal open={open} onClose={onClose} className="modal-overlay">
      <Box
        className="login-modal"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Bem-vindo de volta!
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Faça login para continuar gerenciando suas finanças.
        </Typography>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={handleRememberMeChange}
              sx={{
                color: theme.palette.text.secondary,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          }
          label="Lembre-se de mim"
          sx={{ color: theme.palette.text.secondary }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '16px', padding: '10px' }}
        >
          Entrar
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
          Entrar com Google
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
      </Box>
    </Modal>
  );
}

export default LoginModal;
