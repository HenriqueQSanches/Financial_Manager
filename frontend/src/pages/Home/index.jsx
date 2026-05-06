import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, TextField, Box, Typography } from '@mui/material';
import { FaUserCircle, FaPlus } from 'react-icons/fa';
import api from '../../services/api';

function Home({ theme, onProfileSelect, showNotification }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfileName, setNewProfileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await api.get('/profiles');
      setProfiles(res.data);
    } catch (e) {
      console.error('Erro ao buscar perfis', e);
      showNotification('Erro ao carregar os perfis', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    if (!newProfileName.trim()) return;
    try {
      setIsCreating(true);
      const res = await api.post('/profiles', { name: newProfileName.trim() });
      const newUser = res.data.user;
      setNewProfileName('');
      setProfiles([...profiles, newUser]);
      onProfileSelect(newUser);
    } catch (e) {
      console.error('Erro ao criar perfil', e);
      showNotification(e.response?.data?.error || 'Erro ao criar perfil', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="hero-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: theme.palette.primary.main, textAlign: 'center' }}>
        Bem-vindo ao Gerenciador Financeiro
      </h1>
      <p style={{ color: theme.palette.text.secondary, textAlign: 'center', maxWidth: '600px' }}>
        Selecione o seu perfil para visualizar suas finanças pessoais.
      </p>
      
      <Box mt={4} display="flex" flexDirection="column" gap={2} width="100%" maxWidth="400px">
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : profiles.length > 0 ? (
          profiles.map(profile => (
            <Button
              key={profile.id}
              variant="outlined"
              size="large"
              startIcon={<FaUserCircle size={24} />}
              onClick={() => onProfileSelect(profile)}
              sx={{
                justifyContent: 'flex-start',
                padding: '16px 24px',
                fontSize: '1.2rem',
                borderRadius: '12px',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                }
              }}
            >
              {profile.name}
            </Button>
          ))
        ) : (
          <Typography textAlign="center" color="text.secondary">
            Nenhum perfil cadastrado.
          </Typography>
        )}

        <Box mt={4} display="flex" flexDirection="column" gap={1} p={3} sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
            Novo Perfil
          </Typography>
          <TextField
            label="Seu Nome"
            variant="outlined"
            size="small"
            fullWidth
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={handleCreateProfile}
            disabled={isCreating || !newProfileName.trim()}
          >
            {isCreating ? 'Criando...' : 'Adicionar e Entrar'}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Home;