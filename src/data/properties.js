// Dados de exemplo - substituir pelos dados reais de cada cliente
export const featuredProperties = [
  {
    id: 1,
    title: "Casa Moderna com Piscina",
    type: "casa",
    operation: "sale",
    price: 450000,
    address: "Jardim das Flores, 123 - Centro",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "/images/property1.jpg",
    description: "Linda casa moderna com piscina, acabamento de primeira qualidade."
  },
  {
    id: 2,
    title: "Apartamento Duplex",
    type: "apartamento",
    operation: "rent",
    price: 1200,
    address: "Av. Principal, 456 - Centro",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "/images/property2.jpg",
    description: "Apartamento duplex com varanda gourmet e vista panorâmica."
  },
  {
    id: 3,
    title: "Sobrado em Condomínio",
    type: "casa",
    operation: "sale",
    price: 320000,
    address: "Rua das Palmeiras, 789 - Jardim",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: "/images/property3.jpg",
    description: "Sobrado em condomínio fechado com área de lazer completa."
  },
  {
    id: 4,
    title: "Cobertura Luxuosa",
    type: "apartamento",
    operation: "sale",
    price: 850000,
    address: "Alameda dos Anjos, 101 - Centro",
    bedrooms: 3,
    bathrooms: 4,
    area: 280,
    image: "/images/property1.jpg",
    description: "Cobertura duplex com piscina privativa e vista para o mar."
  }
];

export const allProperties = [
  ...featuredProperties,
  {
    id: 5,
    title: "Casa Compacta",
    type: "casa",
    operation: "sale",
    price: 180000,
    address: "Rua Simples, 202 - Bairro Novo",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    image: "/images/property2.jpg",
    description: "Casa compacta ideal para primeiro imóvel."
  },
  {
    id: 6,
    title: "Apartamento Studio",
    type: "apartamento",
    operation: "rent",
    price: 800,
    address: "Travessa Central, 303 - Centro",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    image: "/images/property3.jpg",
    description: "Studio mobiliado próximo ao centro comercial."
  },
  {
    id: 7,
    title: "Terreno Residencial",
    type: "terreno",
    operation: "sale",
    price: 95000,
    address: "Loteamento Verde, 404 - Zona Norte",
    bedrooms: 0,
    bathrooms: 0,
    area: 300,
    image: "/images/property1.jpg",
    description: "Terreno plano pronto para construção."
  },
  {
    id: 8,
    title: "Sala Comercial",
    type: "comercial",
    operation: "rent",
    price: 1500,
    address: "Av. Comercial, 505 - Centro Empresarial",
    bedrooms: 0,
    bathrooms: 1,
    area: 60,
    image: "/images/property2.jpg",
    description: "Sala comercial em localização privilegiada."
  }
];

// Funções úteis para filtrar propriedades
export const filterProperties = (filters) => {
  return allProperties.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.operation && property.operation !== filters.operation) return false;
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    return true;
  });
};

export const getPropertyTypes = () => {
  return [...new Set(allProperties.map(prop => prop.type))];
};

export const getPropertiesByType = (type) => {
  return allProperties.filter(prop => prop.type === type);
};