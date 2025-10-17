import React, { useState } from 'react'
import { allProperties } from '../../data/properties.js'
import Autocomplete from '../AutoComplete/AutoComplete.jsx'
import './SearchFilters.css'

const SearchFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    operation: '',
    bedrooms: '',
    minPrice: '',
    maxPrice: '',
    location: '' // ✅ Novo filtro de localização
  })

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    }
    
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleLocationSelect = (location) => {
    const newFilters = {
      ...filters,
      location: location
    }
    
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (filterData) => {
    const filtered = allProperties.filter(property => {
      // Filtro por tipo
      if (filterData.type && property.type !== filterData.type) return false
      
      // Filtro por operação (venda/aluguel)
      if (filterData.operation && property.operation !== filterData.operation) return false
      
      // Filtro por quartos
      if (filterData.bedrooms && property.bedrooms < parseInt(filterData.bedrooms)) return false
      
      // Filtro por preço mínimo
      if (filterData.minPrice && property.price < parseInt(filterData.minPrice)) return false
      
      // Filtro por preço máximo
      if (filterData.maxPrice && property.price > parseInt(filterData.maxPrice)) return false
      
      // ✅ Novo filtro por localização
      if (filterData.location && !property.address.toLowerCase().includes(filterData.location.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    onFilter(filtered)
  }

  const clearFilters = () => {
    const resetFilters = {
      type: '',
      operation: '',
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
      location: ''
    }
    
    setFilters(resetFilters)
    onFilter(allProperties)
  }

  return (
    <div className="search-filters-component">
      <div className="filters-header">
        <h3>Filtrar Imóveis</h3>
        <button type="button" className="clear-filters" onClick={clearFilters}>
          Limpar Filtros
        </button>
      </div>
      
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="type">Tipo do Imóvel</label>
          <select 
            id="type"
            name="type" 
            value={filters.type} 
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="operation">Operação</label>
          <select 
            id="operation"
            name="operation" 
            value={filters.operation} 
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="sale">Venda</option>
            <option value="rent">Aluguel</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="bedrooms">Mín. Quartos</label>
          <select 
            id="bedrooms"
            name="bedrooms" 
            value={filters.bedrooms} 
            onChange={handleFilterChange}
          >
            <option value="">Qualquer</option>
            <option value="1">1+ quarto</option>
            <option value="2">2+ quartos</option>
            <option value="3">3+ quartos</option>
            <option value="4">4+ quartos</option>
          </select>
        </div>

        {/* ✅ Novo campo de localização com autocomplete */}
        <div className="filter-group">
          <label htmlFor="location">Bairro ou Cidade</label>
          <Autocomplete 
            onLocationSelect={handleLocationSelect}
            placeholder="Digite o bairro..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Preço Mín.</label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            placeholder="R$ 0"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Preço Máx.</label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            placeholder="R$ 0"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchFilters