import React, { useState } from 'react'
import './Admin.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('properties')
  const [properties, setProperties] = useState([])
  const [newProperty, setNewProperty] = useState({
    title: '',
    type: '',
    operation: '',
    price: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: ''
  })

  const handleAddProperty = (e) => {
    e.preventDefault()
    const property = {
      id: Date.now(),
      ...newProperty,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    setProperties([...properties, property])
    setNewProperty({
      title: '', type: '', operation: '', price: '', address: '',
      bedrooms: '', bathrooms: '', area: '', description: ''
    })
    alert('Imóvel cadastrado com sucesso!')
  }

  const handleChange = (e) => {
    setNewProperty({
      ...newProperty,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1 className="gradient-title">Painel do Corretor</h1>
          <p className="gradient-subtitle">Gerencie imóveis e acompanhe seus anúncios</p>
        </div>

        <div className="admin-dashboard">
          <div className="admin-sidebar">
            <button 
              className={`tab-button ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => setActiveTab('properties')}
            >
              🏠 Meus Imóveis
            </button>
            <button 
              className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              ➕ Cadastrar Imóvel
            </button>
            <button 
              className={`tab-button ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              📋 Leads
            </button>
            <button 
              className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              📊 Estatísticas
            </button>
          </div>

          <div className="admin-content">
            {activeTab === 'properties' && (
              <div className="tab-content">
                <h2 className="section-title">Meus Imóveis Cadastrados</h2>
                {properties.length === 0 ? (
                  <div className="empty-state">
                    <p>Nenhum imóvel cadastrado ainda.</p>
                    <button onClick={() => setActiveTab('add')} className="primary-button">
                      Cadastrar Primeiro Imóvel
                    </button>
                  </div>
                ) : (
                  <div className="properties-list">
                    {properties.map(property => (
                      <div key={property.id} className="property-item">
                        <h3>{property.title}</h3>
                        <p>{property.address}</p>
                        <div className="property-meta">
                          <span>R$ {property.price}</span>
                          <span>{property.type}</span>
                          <span>{property.operation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'add' && (
              <div className="tab-content">
                <h2 className="section-title">Cadastrar Novo Imóvel</h2>
                <form onSubmit={handleAddProperty} className="admin-form">
                  {/* ... resto do formulário ... */}
                </form>
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="tab-content">
                <h2 className="section-title">Leads e Interessados</h2>
                <div className="empty-state">
                  <p>Funcionalidade em desenvolvimento...</p>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="tab-content">
                <h2 className="section-title">Estatísticas</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>{properties.length}</h3>
                    <p>Imóveis Ativos</p>
                  </div>
                  <div className="stat-card">
                    <h3>0</h3>
                    <p>Leads Hoje</p>
                  </div>
                  <div className="stat-card">
                    <h3>0</h3>
                    <p>Visualizações</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin