import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListProperty.css'

const ListProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    operation: '',
    price: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    images: []
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Imóvel para anunciar:', formData)
    alert('Seu imóvel foi enviado para análise! Entraremos em contato em breve.')
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    console.log('Imagens selecionadas:', files)
    alert(`${files.length} imagem(ns) selecionada(s)`)
  }

  return (
    <div className="list-property-page">
      <div className="container">
        <div className="page-header">
           <h1 className="gradient-title">Anunciar Imóvel</h1>
           <p className="gradient-subtitle">Preencha os dados do seu imóvel e nossa equipe entrará em contato</p>
        </div>

        <form className="property-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>📝 Dados do Imóvel</h2>
            
            <div className="form-row">
              <div className="input-group">
                <label>Título do Anúncio *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Casa moderna com piscina..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Tipo do Imóvel *</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="comercial">Comercial</option>
                  <option value="rural">Rural</option>
                </select>
              </div>

              <div className="input-group">
                <label>Operação *</label>
                <select name="operation" value={formData.operation} onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel</option>
                </select>
              </div>

              <div className="input-group">
                <label>Valor (R$) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="500000"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Endereço Completo *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rua, número, bairro, cidade..."
                required
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Quartos</label>
                <select name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="1">1 quarto</option>
                  <option value="2">2 quartos</option>
                  <option value="3">3 quartos</option>
                  <option value="4">4 quartos</option>
                  <option value="5">5+ quartos</option>
                </select>
              </div>

              <div className="input-group">
                <label>Banheiros</label>
                <select name="bathrooms" value={formData.bathrooms} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="1">1 banheiro</option>
                  <option value="2">2 banheiros</option>
                  <option value="3">3 banheiros</option>
                  <option value="4">4+ banheiros</option>
                </select>
              </div>

              <div className="input-group">
                <label>Área (m²)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="150"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Descrição do Imóvel *</label>
              <textarea
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva seu imóvel com detalhes..."
                required
              ></textarea>
            </div>

            <div className="input-group">
              <label>Fotos do Imóvel</label>
              <div className="image-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="upload-info">
                  <span>📷 Clique para adicionar fotos</span>
                  <small>Máximo 10 fotos • Formatos: JPG, PNG</small>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>👤 Dados do Proprietário</h2>
            
            <div className="form-row">
              <div className="input-group">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button large">
              🚀 Enviar para Análise
            </button>
            <p className="form-note">
              * Nossa equipe entrará em contato dentro de 24 horas
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListProperty