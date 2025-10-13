import React, { useState } from 'react'
import { COMPANY_CONFIG } from '../../utils/config.js'
import Autocomplete from '../AutoComplete/AutoComplete.jsx'
import './Hero.css'

const Hero = () => {
  const [searchData, setSearchData] = useState({
    operation: '',
    type: '',
    location: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de busca
    console.log('Buscar:', searchData)
    alert(`Buscando imóveis: ${searchData.operation} - ${searchData.type} - ${searchData.location}`)
  }

  const handleLocationSelect = (location) => {
    setSearchData({
      ...searchData,
      location: location
    })
  }

  return (
    <section className="hero">
      <div className="container">
        <h1>Encontre o imóvel dos seus sonhos</h1>
        <p>Mais de 1000 imóveis disponíveis para compra e aluguel</p>
        
        <div className="search-box">
          <form onSubmit={handleSearch} className="search-filters">
            {/* Primeiro select - Operação */}
            <select 
              name="operation"
              value={searchData.operation}
              onChange={(e) => setSearchData({...searchData, operation: e.target.value})}
            >
              <option value="">Comprar ou Alugar?</option>
              <option value="sale">Comprar</option>
              <option value="rent">Alugar</option>
            </select>
            
            {/* Segundo select - Tipo */}
            <select 
              name="type"
              value={searchData.type}
              onChange={(e) => setSearchData({...searchData, type: e.target.value})}
            >
              <option value="">Tipo de Imóvel</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
            
            {/* Autocomplete - Bairro/Cidade */}
            <Autocomplete 
              onLocationSelect={handleLocationSelect}
              placeholder="Digite o bairro ou cidade..."
            />
            
            {/* Botão de busca */}
            <button type="submit" className="search-btn">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero