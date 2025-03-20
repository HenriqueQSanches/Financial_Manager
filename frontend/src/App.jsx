import React from 'react';

function App() {
  return (
    <div>
      <h1>Bem-vindo à Home</h1>
      <p>Esta é a página inicial do meu Sistema de Login e Gerenciamento de Atividades</p>
      <div>
        <button onClick={() => alert('Ir para Login')}>Login</button>
        <button onClick={() => alert('Ir para Registro')}>Registrar</button>
      </div>
    </div>
  );
}

export default App;
