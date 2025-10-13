import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PropertyCard.css'

const PropertyCard = ({ property }) => {
  const navigate = useNavigate()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleCardClick = () => {
    navigate(`/imoveis/${property.id}`)
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    navigate(`/imoveis/${property.id}`)
  }

  return (
    <div className="property-card" onClick={handleCardClick}>
      <div className="property-image-container">
        <img 
          src={property.image} 
          alt={property.title}
          className="property-image"
        />
        <div className="property-badges">
          <span className={`property-type ${property.operation}`}>
            {property.operation === 'sale' ? 'Venda' : 'Aluguel'}
          </span>
          <span className="property-price">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
      
      <div className="property-info">
        {/* TÍTULO E ENDEREÇO EM CIMA */}
        <h3 className="property-title">{property.title}</h3>
        <p className="property-address">{property.address}</p>
        
        {/* FEATURES E BOTÃO LADO A LADO EMBAIXO */}
        <div className="property-bottom-section">
          <div className="property-features">
            <div className="feature">
              <span className="feature-icon">🛏</span>
              <span className="feature-text">{property.bedrooms}</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚽</span>
              <span className="feature-text">{property.bathrooms}</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📐</span>
              <span className="feature-text">{property.area}m²</span>
            </div>
          </div>
          
          <button 
            className="property-button"
            onClick={handleButtonClick}
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard