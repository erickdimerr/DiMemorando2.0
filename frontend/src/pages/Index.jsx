import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import axios from 'axios';

const Index = () => {
  const [usuarios, setUsuarios] = useState([]); // Inicializa como um array vazio
  const [memorando, setMemorando] = useState(0); // Inicializa como 0
  const [oficio, setOficio] = useState(0); // Inicializa como 0
  const [declaracao, setDeclaracao] = useState(0); // Inicializa como 0
  const [memorandoCircular, setMemorandoCircular] = useState(0); // Inicializa como 0
  const [oficioCircular, setOficioCircular] = useState(0); // Inicializa como 0
  const [atestado, setAtestado] = useState(0); // Inicializa como 0
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        const data = await response.json();
        setUsuarios(data || []); // Garante que seja um array
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    const fetchDocumentos = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:3000/getMemorando'),
          fetch('http://localhost:3000/getOficio'),
          fetch('http://localhost:3000/getDeclaracao'),
          fetch('http://localhost:3000/getMemorandoCircular'),
          fetch('http://localhost:3000/getOficioCircular'),
          fetch('http://localhost:3000/getAtestado')
        ]);

        const data = await Promise.all(responses.map(response => {
          if (!response.ok) {
            throw new Error('Erro na resposta da rede');
          }
          return response.json();
        }));

        // Atualiza os estados com os valores do banco de dados
        setMemorando(data[0].memorando || 0);
        setOficio(data[1].oficio || 0);
        setDeclaracao(data[2].declaracao || 0);
        setMemorandoCircular(data[3].memorandoCircular || 0);
        setOficioCircular(data[4].oficioCircular || 0);
        setAtestado(data[5].atestado || 0);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };

    fetchUsuarios();
    fetchDocumentos(); // Chama a função para buscar os documentos
  }, []);

  const adquirirMemorando = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adquirirMemorando');
      console.log('Memorando adquirido:', response.data);
      setMemorando(response.data.memorando);
    } catch (error) {
      console.error("Erro ao adquirir memorando:", error);
      setErro("Erro ao adquirir memorando");
    }
  };

  const adquirirMemorandoCircular = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adquirirMemorandoCircular');
      console.log('Memorando Circular adquirido:', response.data);
      setMemorandoCircular(response.data.memorandoCircular);
    } catch (error) {
      console.error("Erro ao adquirir Memorando Circular:", error);
      setErro("Erro ao adquirir Memorando Circular");
    }
  };

  const adquirirOficio = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adquirirOficio');
      console.log('Oficio adquirido:', response.data);
      setOficio(response.data.oficio);
    } catch (error) {
      console.error("Erro ao adquirir Ofício:", error);
      setErro("Erro ao adquirir Ofício");
    }
  };

  const adquirirDeclaracao = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adquirirDeclaracao');
      console.log('Declaracao adquirido:', response.data);
      setDeclaracao(response.data.declaracao);
    } catch (error) {
      console.error("Erro ao adquirir Declaração:", error);
      setErro("Erro ao adquirir Declaração");
    }
  };

  const adquirirOficioCircular = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adquirirOficioCircular');
      console.log('Ofício Circular adquirido:', response.data);
      setOficioCircular(response.data.oficioCircular);
    } catch (error) {
      console.error("Erro ao adquirir Ofício Circular:", error);
      setErro("Erro ao adquirir Ofício Circular");
    }
  };

  const adquirirAtestado = async () => {
    try {
      const response = await axios.post('http://localhost:3000/adquirirAtestado');
      console.log('Ofício Atestado:', response.data);
      setAtestado(response.data.atestado);
    } catch (error) {
      console.error("Erro ao adquirir Atestado:", error);
      setErro("Erro ao adquirir Atestado");
    }
  };

  return (
    <div className="index-container">
      <header className="header">
        <h2>DiMemorando</h2>
        <h3>Último documento:</h3>
        <div className="green-box">
          <h1>{usuarios.length > 0 ? usuarios[0].documento_numero : 'Carregando...'}</h1>
          <p>{usuarios.length > 0 ? usuarios[0].documento_tipo : 'Carregando...'}</p>
          <p>Por: {usuarios.length > 0 ? usuarios[0].usuario_email : 'Carregando...'}</p>
        </div>
        <div className="button-container">
          <div className="button-row">
            <button onClick={adquirirMemorando} className="adquirir-button">
              Adquirir Memorando<br />
              <span className="document-number">Memorando Atual: {memorando}</span>
            </button>
            <button onClick={adquirirOficio} className="adquirir-button">
              Adquirir Ofício<br />
              <span className="document-number">Ofício Atual: {oficio}</span>
            </button>
            <button onClick={adquirirDeclaracao} className="adquirir-button">
              Adquirir Declaração<br />
              <span className="document-number">Declaração Atual: {declaracao}</span>
            </button>
          </div>
          <div className="button-row">
            <button onClick={adquirirMemorandoCircular} className="adquirir-button">
              Adquirir Memorando Circular<br />
              <span className="document-number">Memorando Circular Atual: {memorandoCircular}</span>
            </button>
            <button onClick={adquirirOficioCircular} className="adquirir-button">
              Adquirir Ofício Circular<br />
              <span className="document-number">Ofício Circular Atual: {oficioCircular}</span>
            </button>
            <button onClick={adquirirAtestado} className="adquirir-button">
              Adquirir Atestado<br />
              <span className="document-number">Atestado Atual: {atestado}</span>
            </button>
          </div>
        </div>
        {erro && <p className="error">{erro}</p>}
      </header>
    </div>
  );
};

export default Index;
