import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { imoveisService } from '../../lib/supabase'
import { COMPANY_CONFIG } from '../../utils/config'
import './Home.css'

const Home = () => {
  const [imoveisDestaque, setImoveisDestaque] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadImoveisDestaque() {
      try {
        const data = await imoveisService.getImoveisDestaque()
        setImoveisDestaque(data)
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error)
      } finally {
        setLoading(false)
      }
    }

    loadImoveisDestaque()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getTipoNegocio = (imovel) => {
    // Se não tiver tipo_negocio no banco, assume venda
    return imovel.tipo_negocio || 'venda'
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="hero-subtitle">
            {COMPANY_CONFIG.description}
          </p>
          <Link to="/imoveis" className="hero-button">
            Ver Imóveis
          </Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-property.jpg" alt="Imóvel de luxo" />
        </div>
      </section>

      {/* Imóveis em Destaque */}
      <section className="featured-properties">
        <div className="container">
          <h2 className="section-title">Imóveis em Destaque</h2>
          
          {loading ? (
            <div className="loading">Carregando imóveis...</div>
          ) : imoveisDestaque.length === 0 ? (
            <div className="no-properties">
              Nenhum imóvel em destaque no momento
            </div>
          ) : (
            <div className="properties-grid">
              {imoveisDestaque.map(imovel => {
                const tipoNegocio = getTipoNegocio(imovel)
                return (
                  <div key={imovel.id} className="property-card">
                    <div className="property-image">
                      <img 
                        src={imovel.imagens && imovel.imagens.length > 0 
                          ? imovel.imagens[0] 
                          : '/images/property-placeholder.jpg'
                        } 
                        alt={imovel.titulo} 
                      />
                      <div className="property-badges">
                        {imovel.destaque && <span className="badge featured">DESTAQUE</span>}
                        <span className="badge type">{imovel.tipo?.toUpperCase()}</span>
                      </div>
                      <div className="property-price-overlay">
                        {formatPrice(imovel.preco)}
                      </div>
                      <div className="property-negocio-badge">
                        {tipoNegocio === 'venda' ? 'VENDA' : 'ALUGUEL'}
                      </div>
                    </div>
                    
                    <div className="property-info">
                      <h3 className="property-title">{imovel.titulo}</h3>
                      <p className="property-address">
                        📍 {imovel.endereco}, {imovel.cidade} - {imovel.estado}
                      </p>
                      <p className="property-description">
                        {imovel.descricao && imovel.descricao.substring(0, 100)}...
                      </p>
                      
                      <div className="property-features">
                        <span>🛏 {imovel.quartos} quartos</span>
                        <span>🚽 {imovel.banheiros} banheiros</span>
                        <span>📐 {imovel.area}m²</span>
                      </div>
                      
                      <Link to={`/imoveis/${imovel.id}`} className="property-button">
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          
          {imoveisDestaque.length > 0 && (
            <div className="section-actions">
              <Link to="/imoveis" className="view-all-button">
                Ver Todos os Imóveis
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Estatísticas */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Imóveis Vendidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Clientes Satisfeitos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Anos de Experiência</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Cidades Atendidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Pronto para encontrar seu novo lar?</h2>
          <p className="cta-description">
            Entre em contato conosco e deixe nos ajudar a encontrar o imóvel perfeito para você.
          </p>
          <div className="cta-buttons">
            <Link to="/contato" className="cta-button primary">
              Fale Conosco
            </Link>
            <Link to="/sobre" className="cta-button secondary">
              Sobre Nós
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home