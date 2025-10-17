import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { imoveisService, corretoresService } from '../../lib/supabase'
import { COMPANY_CONFIG } from '../../utils/config'
import './PropertyDetails.css'

const PropertyDetails = () => {
  const { id } = useParams()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [imovel, setImovel] = useState(null)
  const [corretores, setCorretores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        console.log('🔄 Carregando imóvel ID:', id)
        
        const imovelData = await imoveisService.getImovelById(id)
        console.log('📦 Dados do imóvel:', imovelData)
        
        if (!imovelData) {
          throw new Error('Imóvel não encontrado')
        }
        
        const corretoresData = await corretoresService.getAllCorretores()
        
        setImovel(imovelData)
        setCorretores(corretoresData)
        setError(null)
      } catch (err) {
        console.error('❌ Erro ao carregar dados:', err)
        setError(err.message)
        setImovel(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadData()
    } else {
      setError('ID do imóvel não fornecido')
      setLoading(false)
    }
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className="property-details">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h2>Carregando imóvel...</h2>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !imovel) {
    return (
      <div className="property-details">
        <div className="container">
          <div className="error-state">
            <h1>😕 Imóvel não encontrado</h1>
            <p>{error || 'O imóvel que você está procurando não existe.'}</p>
            <Link to="/imoveis" className="back-button">
              ← Voltar para Imóveis
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Preparar imagens
  const propertyImages = imovel.imagens && imovel.imagens.length > 0 
    ? imovel.imagens 
    : ['/images/property-placeholder.jpg']

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getTipoNegocio = () => {
    return imovel.tipo_negocio || 'venda'
  }

  const handleContact = () => {
    const message = `Olá! Tenho interesse no imóvel: ${imovel.titulo} - ${formatPrice(imovel.preco)}`
    const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleScheduleVisit = () => {
    const message = `Olá! Gostaria de agendar uma visita para o imóvel: ${imovel.titulo}`
    const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const tipoNegocio = getTipoNegocio()

  return (
    <div className="property-details">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container">
          <Link to="/">Início</Link>
          <span> / </span>
          <Link to="/imoveis">Imóveis</Link>
          <span> / </span>
          <span>{imovel.titulo}</span>
        </div>
      </nav>

      <div className="container">
        {/* Galeria de Imagens */}
        <div className="property-gallery">
          <div className="main-image">
            <img 
              src={propertyImages[activeImageIndex]} 
              alt={imovel.titulo}
              className="active-image"
              onError={(e) => {
                e.target.src = '/images/property-placeholder.jpg'
              }}
            />
            <div className="image-badges">
              {imovel.destaque && <span className="property-badge destaque">⭐ DESTAQUE</span>}
              <span className="property-badge price">{formatPrice(imovel.preco)}</span>
              <span className="property-badge type">{imovel.tipo?.toUpperCase()}</span>
              <span className="property-badge negocio">
                {tipoNegocio === 'venda' ? 'VENDA' : 'ALUGUEL'}
              </span>
            </div>
          </div>
          
          {propertyImages.length > 1 && (
            <div className="image-thumbnails">
              {propertyImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${imovel.titulo} ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/images/property-placeholder.jpg'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="property-content">
          {/* Informações Principais */}
          <div className="property-main-info">
            <div className="property-header">
              <h1 className="property-title">{imovel.titulo}</h1>
              <div className="property-price-large">
                {formatPrice(imovel.preco)}
                <span className="property-negocio-text">
                  • {tipoNegocio === 'venda' ? 'VENDA' : 'ALUGUEL'}
                </span>
              </div>
            </div>

            <p className="property-address">
              📍 {imovel.endereco}, {imovel.cidade} - {imovel.estado}
            </p>

            <p className="property-description">
              {imovel.descricao}
            </p>

            {/* Características */}
            <div className="property-features-grid">
              <div className="feature-item">
                <div className="feature-icon">🛏</div>
                <div className="feature-info">
                  <span className="feature-value">{imovel.quartos}</span>
                  <span className="feature-label">Quartos</span>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🚽</div>
                <div className="feature-info">
                  <span className="feature-value">{imovel.banheiros}</span>
                  <span className="feature-label">Banheiros</span>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📐</div>
                <div className="feature-info">
                  <span className="feature-value">{imovel.area}m²</span>
                  <span className="feature-label">Área Total</span>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🏢</div>
                <div className="feature-info">
                  <span className="feature-value">{imovel.tipo}</span>
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
                  <span className={`status-${imovel.status}`}>
                    {imovel.status === 'disponivel' ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
                <div className="detail-item">
                  <strong>Cidade:</strong>
                  <span>{imovel.cidade}</span>
                </div>
                <div className="detail-item">
                  <strong>Estado:</strong>
                  <span>{imovel.estado}</span>
                </div>
                <div className="detail-item">
                  <strong>CEP:</strong>
                  <span>{imovel.cep}</span>
                </div>
                <div className="detail-item">
                  <strong>Tipo de Negócio:</strong>
                  <span>{tipoNegocio === 'venda' ? 'Venda' : 'Aluguel'}</span>
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
                <div className="amenity-item">🚗 Garagem</div>
                <div className="amenity-item">📶 Internet Fibra</div>
                <div className="amenity-item">🔒 Portaria</div>
                <div className="amenity-item">🌳 Área Verde</div>
                <div className="amenity-item">🍽️ Churrasqueira</div>
              </div>
            </div>
          </div>

          {/* Sidebar de Contato */}
          <div className="property-sidebar">
            <div className="contact-card">
              <div className="agent-info">
                {corretores.length > 0 ? (
                  <>
                    <div className="agent-avatar">
                      {corretores[0].avatar_url ? (
                        <img 
                          src={corretores[0].avatar_url} 
                          alt={corretores[0].nome}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div className="agent-avatar-placeholder">
                        {corretores[0].nome.charAt(0)}
                      </div>
                    </div>
                    <div className="agent-details">
                      <h3>{corretores[0].nome}</h3>
                      <p>Corretor Credenciado</p>
                      <div className="agent-contact">
                        <div>📞 {corretores[0].telefone}</div>
                        <div>📧 {corretores[0].email}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="agent-avatar">
                      <div className="agent-avatar-placeholder">C</div>
                    </div>
                    <div className="agent-details">
                      <h3>Corretor</h3>
                      <p>Entre em contato</p>
                      <div className="agent-contact">
                        <div>📞 {COMPANY_CONFIG.phone}</div>
                      </div>
                    </div>
                  </>
                )}
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
                <div className="map-placeholder">
                  <p>Mapa de localização</p>
                  <small>Integração com Google Maps</small>
                </div>
              </div>
              <p className="location-text">
                {imovel.endereco}, {imovel.cidade} - {imovel.estado}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails