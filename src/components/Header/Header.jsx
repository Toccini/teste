import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { COMPANY_CONFIG } from '../../utils/config.js'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">{COMPANY_CONFIG.name}</span>
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Início
              </Link>
            </li>
            <li>
              <Link 
                to="/imoveis" 
                className={location.pathname === '/imoveis' ? 'active' : ''}
              >
                Imóveis
              </Link>
            </li>
            <li>
              <Link 
                to="/anunciar" 
                className={location.pathname === '/anunciar' ? 'active' : ''}
              >
                Anunciar Imóvel
              </Link>
            </li>
            <li>
              <Link 
                to="/sobre" 
                className={location.pathname === '/sobre' ? 'active' : ''}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link 
                to="/contato" 
                className={location.pathname === '/contato' ? 'active' : ''}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header