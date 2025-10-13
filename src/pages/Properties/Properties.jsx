import React, { useState } from 'react'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'
import SearchFilters from '../../components/SearchFilters/SearchFilters.jsx'
import { allProperties } from '../../data/properties.js'
import './Properties.css'

const Properties = () => {
  const [filteredProperties, setFilteredProperties] = useState(allProperties)

  return (
    <div className="properties-page">
      <div className="container">
        <div className="page-header">
          <h1 className="gradient-title">Todos os Imóveis</h1>
          <p className="gradient-subtitle">Encontre o imóvel perfeito para você</p>
        </div>
        
        <SearchFilters onFilter={setFilteredProperties} />
        
        <div className="properties-count">
          <p>{filteredProperties.length} imóveis encontrados</p>
        </div>

        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="no-results">
              <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
              <p>Tente ajustar os critérios de busca.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Properties