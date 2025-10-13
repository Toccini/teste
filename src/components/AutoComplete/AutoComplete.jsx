import React, { useState, useRef, useEffect } from 'react'
import { bairrosMarilia } from '../../data/bairros.js'
import './AutoComplete.css'

const Autocomplete = ({ onLocationSelect, placeholder = "Digite o bairro ou cidade..." }) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [bairros, setBairros] = useState([])
  const inputRef = useRef(null)

  // Carrega os bairros quando o componente monta
  useEffect(() => {
    setBairros(bairrosMarilia)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 1 && bairros.length > 0) {
      const filtered = bairros.filter(bairro =>
        bairro.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text
    
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    )
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    setSuggestions([])
    if (onLocationSelect) {
      onLocationSelect(suggestion)
    }
  }

  const handleInputFocus = () => {
    if (inputValue.length > 1 && bairros.length > 0) {
      setShowSuggestions(true)
    }
  }

  const clearInput = () => {
    setInputValue('')
    setSuggestions([])
    setShowSuggestions(false)
    if (onLocationSelect) {
      onLocationSelect('')
    }
  }

  return (
    <div className="autocomplete-container" ref={inputRef}>
      <div className="autocomplete-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="autocomplete-input"
        />
        {inputValue && (
          <button 
            type="button" 
            className="clear-button"
            onClick={clearInput}
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          <div className="suggestions-count">
            {suggestions.length} bairro{suggestions.length !== 1 ? 's' : ''} encontrado{suggestions.length !== 1 ? 's' : ''}
          </div>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-icon">📍</span>
              <span className="suggestion-text">
                {highlightText(suggestion, inputValue)}
              </span>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && inputValue.length > 1 && (
        <div className="suggestions-dropdown">
          <div className="suggestion-item no-results">
            Nenhum bairro encontrado para "{inputValue}"
          </div>
        </div>
      )}
    </div>
  )
}

export default Autocomplete