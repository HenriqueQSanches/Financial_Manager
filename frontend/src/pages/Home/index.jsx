import React from 'react';
import { Button } from '@mui/material';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function Home({ theme, onLoginClick, onRegisterClick }) {
  return (
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
          onClick={onLoginClick}
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
          onClick={onRegisterClick}
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
  );
}

export default Home;