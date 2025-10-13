import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulação de login
    console.log('Tentando login:', formData)
    
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', formData.email)
        alert('Login realizado com sucesso!')
        navigate('/admin') // ✅ CORRIGIDO: Redireciona para /admin
      } else {
        alert('Por favor, preencha todos os campos!')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1>Área do Corretor</h1>
          <p>Faça login para gerenciar os imóveis</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Sua senha"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-demo">
            <p><strong>Dica:</strong> Use qualquer email e senha para testar</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login