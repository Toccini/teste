import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { imoveisService } from '../../lib/supabase'
import SearchFilters from '../../components/SearchFilters/SearchFilters'
import './Properties.css'

const Properties = () => {
  const [imoveis, setImoveis] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    tipo: '',
    cidade: '',
    bairro: '',
    quartos: '',
    preco_max: '',
    tipo_negocio: ''
  })

  // Carregar todos os imóveis na primeira vez
  useEffect(() => {
    loadAllImoveis()
  }, [])

  const loadAllImoveis = async () => {
    try {
      setLoading(true)
      console.log('🔄 Carregando todos os imóveis...')
      const imoveisData = await imoveisService.getAllImoveis()
      console.log('📦 Imóveis carregados:', imoveisData)
      setImoveis(imoveisData)
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      console.log('🔍 Aplicando filtros:', filters)
      
      // Remove filtros vazios
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      )
      
      console.log('🎯 Filtros ativos para busca:', activeFilters)
      
      // Se não há filtros ativos, carrega todos
      if (Object.keys(activeFilters).length === 0) {
        console.log('ℹ️  Sem filtros ativos, carregando todos os imóveis')
        await loadAllImoveis()
        return
      }
      
      const imoveisData = await imoveisService.getAllImoveis(activeFilters)
      console.log('✅ Imóveis encontrados com filtros:', imoveisData)
      setImoveis(imoveisData)
    } catch (error) {
      console.error('❌ Erro ao buscar imóveis:', error)
      alert('Erro ao buscar imóveis. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    console.log('📝 Filtros alterados:', newFilters)
    setFilters(newFilters)
  }

  const clearFilters = () => {
    console.log('🗑️  Limpando filtros')
    setFilters({
      tipo: '',
      cidade: '',
      bairro: '',
      quartos: '',
      preco_max: '',
      tipo_negocio: ''
    })
    // Recarregar todos os imóveis quando limpar filtros
    loadAllImoveis()
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getTipoNegocio = (imovel) => {
    return imovel.tipo_negocio || 'venda'
  }

  return (
    <div className="properties-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Nossos Imóveis</h1>
          <p className="page-subtitle">
            Encontre o imóvel perfeito para você
          </p>
        </div>

        {/* Filtros com Botão de Pesquisa */}
        <div className="filters-section">
          <SearchFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <div className="filter-actions">
            <button 
              onClick={handleSearch}
              className="search-button"
              disabled={loading}
            >
              {loading ? '⏳ Buscando...' : '🔍 Buscar Imóveis'}
            </button>
            <button 
              onClick={clearFilters}
              className="clear-filters-button"
              disabled={loading}
            >
              🗑️ Limpar Filtros
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="properties-results">
          {loading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Buscando imóveis...</p>
            </div>
          ) : imoveis.length === 0 ? (
            <div className="no-results">
              <h3>Nenhum imóvel encontrado</h3>
              <p>Tente ajustar os filtros para ver mais resultados.</p>
              <button 
                onClick={clearFilters}
                className="clear-filters-button large"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          ) : (
            <>
              <div className="results-header">
                <p className="results-count">
                  {imoveis.length} imóveis encontrados
                </p>
              </div>
              
              <div className="properties-grid">
                {imoveis.map(imovel => {
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
                          {imovel.descricao && imovel.descricao.substring(0, 120)}...
                        </p>
                        
                        <div className="property-features">
                          <div className="feature">
                            <span className="feature-icon">🛏</span>
                            <span className="feature-text">{imovel.quartos} quartos</span>
                          </div>
                          <div className="feature">
                            <span className="feature-icon">🚽</span>
                            <span className="feature-text">{imovel.banheiros} banheiros</span>
                          </div>
                          <div className="feature">
                            <span className="feature-icon">📐</span>
                            <span className="feature-text">{imovel.area}m²</span>
                          </div>
                        </div>
                        
                        <div className="property-actions">
                          <Link to={`/imoveis/${imovel.id}`} className="view-details-button">
                            Ver Detalhes
                          </Link>
                          <button className="favorite-button">
                            ❤️
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Properties