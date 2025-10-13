import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { allProperties } from '../../data/properties.js'
import { COMPANY_CONFIG } from '../../utils/config.js'
import './PropertyDetails.css'

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  // Encontrar o imóvel pelo ID
  const property = allProperties.find(prop => prop.id === parseInt(id))

  // Se não encontrar o imóvel, redireciona
  if (!property) {
    return (
      <div className="property-not-found">
        <div className="container">
          <h1>Imóvel não encontrado</h1>
          <p>O imóvel que você está procurando não existe ou foi removido.</p>
          <Link to="/imoveis" className="back-button">
            Voltar para Imóveis
          </Link>
        </div>
      </div>
    )
  }

  // Simulação de mais imagens (em um sistema real viria do backend)
  const propertyImages = [
    property.image,
    "/images/property-interior1.jpg",
    "/images/property-interior2.jpg",
    "/images/property-interior3.jpg",
    "/images/property-interior4.jpg"
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleContact = () => {
    const message = `Olá! Tenho interesse no imóvel: ${property.title} - ${formatPrice(property.price)}`
    const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleScheduleVisit = () => {
    const message = `Olá! Gostaria de agendar uma visita para o imóvel: ${property.title}`
    const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="property-details">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container">
          <Link to="/">Início</Link>
          <span> / </span>
          <Link to="/imoveis">Imóveis</Link>
          <span> / </span>
          <span>{property.title}</span>
        </div>
      </nav>

      <div className="container">
        {/* Galeria de Imagens */}
        <div className="property-gallery">
          <div className="main-image">
            <img 
              src={propertyImages[activeImageIndex]} 
              alt={property.title}
              className="active-image"
            />
            <div className="image-badges">
              <span className={`property-badge operation ${property.operation}`}>
                {property.operation === 'sale' ? '🏠 Venda' : '📄 Aluguel'}
              </span>
              <span className="property-badge price">
                {formatPrice(property.price)}
              </span>
            </div>
          </div>
          
          <div className="image-thumbnails">
            {propertyImages.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image} alt={`${property.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="property-content">
          {/* Informações Principais */}
          <div className="property-main-info">
            <div className="property-header">
              <h1 className="property-title">{property.title}</h1>
              <div className="property-price-large">
                {formatPrice(property.price)}
              </div>
            </div>

            <p className="property-address">
              📍 {property.address}
            </p>

            <p className="property-description">
              {property.description}
            </p>

            {/* Características */}
            <div className="property-features-grid">
              <div className="feature-item">
                <div className="feature-icon">🛏</div>
                <div className="feature-info">
                  <span className="feature-value">{property.bedrooms}</span>
                  <span className="feature-label">Quartos</span>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🚽</div>
                <div className="feature-info">
                  <span className="feature-value">{property.bathrooms}</span>
                  <span className="feature-label">Banheiros</span>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📐</div>
                <div className="feature-info">
                  <span className="feature-value">{property.area}m²</span>
                  <span className="feature-label">Área Total</span>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🏢</div>
                <div className="feature-info">
                  <span className="feature-value">
                    {property.type === 'casa' ? 'Casa' : 
                     property.type === 'apartamento' ? 'Apartamento' : 
                     property.type === 'terreno' ? 'Terreno' : 'Comercial'}
                  </span>
                  <span className="feature-label">Tipo</span>
                </div>
              </div>
            </div>

            {/* Detalhes Adicionais */}
            <div className="property-details-section">
              <h2>📋 Detalhes do Imóvel</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Status:</strong>
                  <span className="status-available">Disponível</span>
                </div>
                <div className="detail-item">
                  <strong>Condomínio:</strong>
                  <span>R$ 350/mês</span>
                </div>
                <div className="detail-item">
                  <strong>IPTU:</strong>
                  <span>R$ 120/mês</span>
                </div>
                <div className="detail-item">
                  <strong>Ano de Construção:</strong>
                  <span>2020</span>
                </div>
                <div className="detail-item">
                  <strong>Andar:</strong>
                  <span>5°</span>
                </div>
                <div className="detail-item">
                  <strong>Vagas na Garagem:</strong>
                  <span>2</span>
                </div>
              </div>
            </div>

            {/* Comodidades */}
            <div className="amenities-section">
              <h2>⭐ Comodidades</h2>
              <div className="amenities-grid">
                <div className="amenity-item">🏊 Piscina</div>
                <div className="amenity-item">🏋️ Academia</div>
                <div className="amenity-item">🎯 Playground</div>
                <div className="amenity-item">🚗 Garagem Coberta</div>
                <div className="amenity-item">📶 Internet Fibra</div>
                <div className="amenity-item">🔒 Portaria 24h</div>
                <div className="amenity-item">🌳 Área Verde</div>
                <div className="amenity-item">🍽️ Churrasqueira</div>
              </div>
            </div>
          </div>

          {/* Sidebar de Contato */}
          <div className="property-sidebar">
            <div className="contact-card">
              <div className="agent-info">
                <div className="agent-avatar">
                  <img src="/images/agent-avatar.jpg" alt="Corretor" />
                </div>
                <div className="agent-details">
                  <h3>Carlos Silva</h3>
                  <p>Corretor Credenciado</p>
                  <div className="agent-rating">
                    ⭐⭐⭐⭐⭐ (4.9)
                  </div>
                </div>
              </div>

              <div className="contact-actions">
                <button 
                  className="contact-button primary"
                  onClick={handleContact}
                >
                  📞 Falar no WhatsApp
                </button>
                
                <button 
                  className="contact-button secondary"
                  onClick={handleScheduleVisit}
                >
                  📅 Agendar Visita
                </button>
                
                <button className="contact-button outline">
                  📧 Enviar Email
                </button>
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  <strong>📞 Telefone:</strong>
                  <span>{COMPANY_CONFIG.phone}</span>
                </div>
                <div className="contact-item">
                  <strong>🕒 Horário:</strong>
                  <span>Seg-Sex: 8h-18h</span>
                </div>
              </div>
            </div>

            {/* Mapa de Localização */}
            <div className="location-card">
              <h3>📍 Localização</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.489332597536!2d-49.9454679246873!3d-22.314933079674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bfdb6b6dcee52d%3A0xe3bbbc4c4953c903!2sMar%C3%ADlia%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Imóvel"
                ></iframe>
              </div>
              <p className="location-text">
                {property.address}
              </p>
            </div>
          </div>
        </div>

        {/* Imóveis Similares */}
        <div className="similar-properties">
          <h2>🏠 Imóveis Similares</h2>
          <div className="similar-grid">
            {allProperties
              .filter(p => p.id !== property.id && p.type === property.type)
              .slice(0, 3)
              .map(similarProperty => (
                <div 
                  key={similarProperty.id} 
                  className="similar-card"
                  onClick={() => navigate(`/imoveis/${similarProperty.id}`)}
                >
                  <div className="similar-image">
                    <img src={similarProperty.image} alt={similarProperty.title} />
                    <span className="similar-price">
                      {formatPrice(similarProperty.price)}
                    </span>
                  </div>
                  <div className="similar-info">
                    <h4>{similarProperty.title}</h4>
                    <p>{similarProperty.address}</p>
                    <div className="similar-features">
                      <span>🛏 {similarProperty.bedrooms}</span>
                      <span>🚽 {similarProperty.bathrooms}</span>
                      <span>📐 {similarProperty.area}m²</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails