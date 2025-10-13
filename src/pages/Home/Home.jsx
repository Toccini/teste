import React from 'react'
import Hero from '../../components/Hero/Hero.jsx'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'
import { featuredProperties } from '../../data/properties.js'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <Hero />
      
      <section className="featured-properties">
        <div className="container">
          <h2 className="section-title">Imóveis em Destaque</h2>
          <div className="properties-grid">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2 className="section-title">Nossos Serviços</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>📈 Compra e Venda</h3>
              <p>Encontre o imóvel perfeito para você e sua família</p>
            </div>
            <div className="service-card">
              <h3>🏠 Aluguel</h3>
              <p>Alugue com segurança e tranquilidade</p>
            </div>
            <div className="service-card">
              <h3>💰 Avaliação</h3>
              <p>Saiba o valor real do seu imóvel</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home