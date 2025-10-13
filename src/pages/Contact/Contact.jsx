import React, { useState } from 'react'
import { COMPANY_CONFIG } from '../../utils/config.js'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="gradient-title">Contato</h1>
          <p className="gradient-subtitle">Estamos aqui para ajudar você a encontrar o imóvel dos seus sonhos</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info-section">
            <h2 className="section-title">Fale Conosco</h2>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-info">
                  <h3>Telefone</h3>
                  <p>{COMPANY_CONFIG.phone}</p>
                  <span>Disponível das 8h às 18h</span>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-info">
                  <h3>Email</h3>
                  <p>{COMPANY_CONFIG.email}</p>
                  <span>Respondemos em até 24h</span>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-info">
                  <h3>Endereço</h3>
                  <p>{COMPANY_CONFIG.address}</p>
                  <span>Visite nosso escritório</span>
                </div>
              </div>
            </div>

            <div className="business-hours">
              <h3>🕒 Horário de Atendimento</h3>
              <div className="hours-list">
                <div className="hour-item">
                  <span>Segunda a Sexta</span>
                  <span>8h às 18h</span>
                </div>
                <div className="hour-item">
                  <span>Sábado</span>
                  <span>8h às 12h</span>
                </div>
                <div className="hour-item">
                  <span>Domingo</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Envie sua Mensagem</h2>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="subject">Assunto</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="compra">Compra de Imóvel</option>
                    <option value="venda">Venda de Imóvel</option>
                    <option value="aluguel">Aluguel</option>
                    <option value="avaliacao">Avaliação</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos como podemos ajudar..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                📨 Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        {/* Mapa Section */}
        <div className="map-section">
          <h2 className="section-title">Onde Estamos</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.489332597536!2d-49.9454679246873!3d-22.314933079674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bfdb6b6dcee52d%3A0xe3bbbc4c4953c903!2sMar%C3%ADlia%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Imobiliária"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact