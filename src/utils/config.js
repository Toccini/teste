// CONFIGURAÇÃO DA IMOBILIÁRIA - ALTERAR PARA CADA CLIENTE
export const COMPANY_CONFIG = {
  // Informações básicas
  name: "Imóveis Marília",
  slogan: "Seu sonho começa aqui",
  
  // Cores da marca (altere para cada cliente)
  primaryColor: "#e74c3c",
  secondaryColor: "#2c3e50",
  accentColor: "#3498db",
  
  // Contato
  phone: "(14) 99999-9999",
  whatsapp: "5514999999999",
  email: "contato@imoveismarilia.com.br",
  address: "Av. Sampaio Vidal, 123 - Centro, Marília/SP",
  
  // Social
  social: {
    facebook: "https://facebook.com/centralimoveismarilia",
    instagram: "https://instagram.com/centralimoveismarilia",
    whatsapp: "https://wa.me/5514999999999"
  },
  
  // SEO
  description: "Imóveis Marília - Especialistas em compra, venda e locação de imóveis em Marília e região. Encontre o imóvel dos seus sonhos!",
  keywords: "imóveis, marília, compra, venda, aluguel, apartamento, casa, terreno"
};

// Configuração do site
export const SITE_CONFIG = {
  apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.centralimoveismarilia.com.br',
  features: {
    search: true,
    filters: true,
    contactForm: true
  }
};