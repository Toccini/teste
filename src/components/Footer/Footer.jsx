import React from 'react';
import { COMPANY_CONFIG } from '../../utils/config';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{COMPANY_CONFIG.name}</h3>
            <p>Sua imobiliária de confiança</p>
          </div>
          
          <div className="footer-section">
            <h4>Contato</h4>
            <p>{COMPANY_CONFIG.phone}</p>
            <p>{COMPANY_CONFIG.email}</p>
            <p>{COMPANY_CONFIG.address}</p>
          </div>
          
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="/">Início</a></li>
              <li><a href="/imoveis">Imóveis</a></li>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 {COMPANY_CONFIG.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;