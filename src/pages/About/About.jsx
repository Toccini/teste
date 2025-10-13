import React from 'react'
import { COMPANY_CONFIG } from '../../utils/config.js'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="page-header">
          <h1 className="gradient-title">Sobre a {COMPANY_CONFIG.name}</h1>
          <p className="gradient-subtitle">Conheça nossa história e missão</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              Há mais de 10 anos no mercado, a {COMPANY_CONFIG.name} tem como 
              missão ajudar você a encontrar o imóvel dos seus sonhos. 
              Oferecemos serviços completos de compra, venda e locação de imóveis.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <h3>🏆 Experiência</h3>
                <p>Mais de uma década no mercado imobiliário</p>
              </div>
              <div className="feature-item">
                <h3>🔒 Segurança</h3>
                <p>Transações seguras e transparentes</p>
              </div>
              <div className="feature-item">
                <h3>📈 Resultados</h3>
                <p>Milhares de imóveis negociados com sucesso</p>
              </div>
            </div>

            <div className="contact-info">
              <h3>Entre em Contato</h3>
              <div className="contact-details">
                <p>📞 {COMPANY_CONFIG.phone}</p>
                <p>📧 {COMPANY_CONFIG.email}</p>
                <p>📍 {COMPANY_CONFIG.address}</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <span>Imagem da Imobiliária</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About