import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, FormControlLabel, Checkbox, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { authService } from '../../../services/auth';
import './styles.css';

function LoginModal({ open, onClose, theme, onSuccess }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await authService.login(form); // salva token/user no localStorage
      if (onSuccess) onSuccess('Login efetuado com sucesso!');
      if (rememberMe) localStorage.setItem('rememberEmail', form.email);
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="modal-overlay">
      <Box
        className="login-modal"
        component="form"
        onSubmit={handleSubmit}
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

        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{
                color: theme.palette.text.secondary,
                '&.Mui-checked': { color: theme.palette.primary.main },
              }}
            />
          }
          label="Lembre-se de mim"
          sx={{ color: theme.palette.text.secondary }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ marginTop: '16px', padding: '10px' }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
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