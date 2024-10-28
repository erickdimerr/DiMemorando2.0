import React from 'react';
import '../styles/index.css'; // Importando o CSS específico

const Index = () => {
  return (
    <div className="index-container">
      <header className="header">
        <h2>DiMemorando</h2>
        <h1>Último documento:</h1>
        <div className="green-box">
          <h1>8</h1>
          <p>Memorando</p>
          <p>Por: Érick dimer</p>
        </div>
        <div class="button-container">
          <button class="adquirir-button">Adquirir </button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
        </div>
        <div>
          <h1>Últimos adquiridos:</h1>
        </div>
      </header>
    </div>
  );
};

export default Index;
