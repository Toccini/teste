import React, { useState, useEffect } from 'react'
import Autocomplete from '../AutoComplete/AutoComplete.jsx'
import { imoveisService } from '../../lib/supabase'
import './SearchFilters.css'

const SearchFilters = ({ filters, onFilterChange, onSearch, onClearFilters, loading = false }) => {
  const [tipos, setTipos] = useState([])
  const [cidades, setCidades] = useState([])

  useEffect(() => {
    loadFilterOptions()
  }, [])

  const loadFilterOptions = async () => {
    try {
      const [tiposData, cidadesData] = await Promise.all([
        imoveisService.getTiposImoveis(),
        imoveisService.getCidades()
      ])
      setTipos(tiposData)
      setCidades(cidadesData)
    } catch (error) {
      console.error('Erro ao carregar opções de filtro:', error)
    }
  }

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  const handleLocationSelect = (location) => {
    onFilterChange({
      ...filters,
      bairro: location
    })
  }

  const handleSearch = () => {
    onSearch()
  }

  const handleClearFilters = () => {
    onClearFilters()
  }

  return (
    <div className="search-filters-component">
      <div className="filters-header">
        <h3>Filtrar Imóveis</h3>
        <button 
          type="button" 
          className="clear-filters" 
          onClick={handleClearFilters}
          disabled={loading}
        >
          🗑️ Limpar Filtros
        </button>
      </div>
      
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="tipo">Tipo do Imóvel</label>
          <select 
            id="tipo"
            name="tipo" 
            value={filters.tipo} 
            onChange={(e) => handleFilterChange('tipo', e.target.value)}
          >
            <option value="">Todos</option>
            {tipos.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="cidade">Cidade</label>
          <select 
            id="cidade"
            name="cidade" 
            value={filters.cidade} 
            onChange={(e) => handleFilterChange('cidade', e.target.value)}
          >
            <option value="">Todas</option>
            {cidades.map(cidade => (
              <option key={cidade} value={cidade}>{cidade}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="bairro">Bairro</label>
          <Autocomplete 
            onLocationSelect={handleLocationSelect}
            placeholder="Digite o bairro..."
            value={filters.bairro}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="quartos">Mín. Quartos</label>
          <select 
            id="quartos"
            name="quartos" 
            value={filters.quartos} 
            onChange={(e) => handleFilterChange('quartos', e.target.value)}
          >
            <option value="">Qualquer</option>
            <option value="1">1+ quarto</option>
            <option value="2">2+ quartos</option>
            <option value="3">3+ quartos</option>
            <option value="4">4+ quartos</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="preco_max">Preço Máx.</label>
          <select 
            id="preco_max"
            name="preco_max" 
            value={filters.preco_max} 
            onChange={(e) => handleFilterChange('preco_max', e.target.value)}
          >
            <option value="">Sem limite</option>
            <option value="200000">Até R$ 200.000</option>
            <option value="500000">Até R$ 500.000</option>
            <option value="1000000">Até R$ 1.000.000</option>
            <option value="2000000">Até R$ 2.000.000</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="tipo_negocio">Tipo de Negócio</label>
          <select 
            id="tipo_negocio"
            name="tipo_negocio" 
            value={filters.tipo_negocio} 
            onChange={(e) => handleFilterChange('tipo_negocio', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
          </select>
        </div>
      </div>

      {/* Botão de Busca */}
      <div className="filter-actions">
        <button 
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? '⏳ Buscando...' : '🔍 Buscar Imóveis'}
        </button>
      </div>
    </div>
  )
}

export default SearchFilters