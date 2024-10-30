import React from 'react';
import '../styles/index.css';

const Index = () => {
  return (
    <div className="index-container">
      <header className="header">
        <h2>DiMemorando</h2>
        <h3>Último documento:</h3>
        <div className="green-box">
          <h1>8</h1>
          <p>Memorando</p>
          <p>Por: Érick dimer</p>
        </div>
        <div className="button-container">
          <button className="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
          <button class="adquirir-button">Adquirir</button>
        </div>
        <div>
          <h3>Últimos adquiridos:</h3>
        </div>
      </header>
    </div>
  );
};

export default Index;
