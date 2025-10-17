import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lnrexruoipdptrnwyehz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucmV4cnVvaXBkcHRybnd5ZWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzc0MTMsImV4cCI6MjA3NTk1MzQxM30.eogENnNNxXrghqFrfHp4Lr7EZdBomegMjWLMupTFWVQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funções para imóveis
export const imoveisService = {
  // Buscar todos os imóveis com filtros
  async getAllImoveis(filters = {}) {
    try {
      console.log('🚀 Iniciando busca no Supabase com filtros:', filters)
      
      let query = supabase
        .from('imoveis')
        .select('*')
        .eq('status', 'disponivel')

      // Aplicar filtros apenas se existirem e não forem vazios
      if (filters.tipo && filters.tipo.trim() !== '') {
        console.log('🎯 Aplicando filtro tipo:', filters.tipo)
        query = query.eq('tipo', filters.tipo)
      }

      if (filters.cidade && filters.cidade.trim() !== '') {
        console.log('🎯 Aplicando filtro cidade:', filters.cidade)
        query = query.ilike('cidade', `%${filters.cidade}%`)
      }

      if (filters.bairro && filters.bairro.trim() !== '') {
        console.log('🎯 Aplicando filtro bairro:', filters.bairro)
        // Busca no endereço por bairro
        query = query.or(`endereco.ilike.%${filters.bairro}%,cidade.ilike.%${filters.bairro}%`)
      }

      if (filters.quartos && filters.quartos !== '') {
        console.log('🎯 Aplicando filtro quartos:', filters.quartos)
        query = query.gte('quartos', parseInt(filters.quartos))
      }

      if (filters.preco_max && filters.preco_max !== '') {
        console.log('🎯 Aplicando filtro preco_max:', filters.preco_max)
        query = query.lte('preco', parseFloat(filters.preco_max))
      }

      if (filters.tipo_negocio && filters.tipo_negocio.trim() !== '') {
        console.log('🎯 Aplicando filtro tipo_negocio:', filters.tipo_negocio)
        query = query.eq('tipo_negocio', filters.tipo_negocio)
      }

      if (filters.destaque) {
        console.log('🎯 Aplicando filtro destaque')
        query = query.eq('destaque', true)
      }

      console.log('📤 Executando query no Supabase...')
      const { data, error } = await query.order('criado_em', { ascending: false })
      
      if (error) {
        console.error('❌ Erro na query do Supabase:', error)
        throw error
      }
      
      console.log('✅ Busca concluída. Imóveis encontrados:', data?.length || 0)
      return data || []
      
    } catch (error) {
      console.error('💥 Erro crítico na busca de imóveis:', error)
      throw error
    }
  },

  // Buscar imóvel por ID
  async getImovelById(id) {
    try {
      console.log('🔍 Buscando imóvel por ID:', id)
      
      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('❌ Erro ao buscar imóvel:', error)
        throw error
      }
      
      console.log('✅ Imóvel encontrado:', data ? 'Sim' : 'Não')
      return data
      
    } catch (error) {
      console.error('💥 Erro crítico ao buscar imóvel:', error)
      throw error
    }
  },

  // Buscar imóveis em destaque
  async getImoveisDestaque() {
    try {
      console.log('⭐ Buscando imóveis em destaque')
      
      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .eq('destaque', true)
        .eq('status', 'disponivel')
        .limit(6)
        .order('criado_em', { ascending: false })

      if (error) throw error
      
      console.log('✅ Imóveis em destaque encontrados:', data?.length || 0)
      return data || []
      
    } catch (error) {
      console.error('❌ Erro ao buscar imóveis em destaque:', error)
      throw error
    }
  },

  // Buscar tipos únicos de imóveis
  async getTiposImoveis() {
    try {
      console.log('🏠 Buscando tipos de imóveis')
      
      const { data, error } = await supabase
        .from('imoveis')
        .select('tipo')
        .eq('status', 'disponivel')

      if (error) throw error
      
      const tipos = [...new Set(data.map(item => item.tipo))].filter(Boolean)
      console.log('✅ Tipos encontrados:', tipos)
      return tipos
      
    } catch (error) {
      console.error('❌ Erro ao buscar tipos:', error)
      throw error
    }
  },

  // Buscar cidades únicas
  async getCidades() {
    try {
      console.log('🏙️ Buscando cidades')
      
      const { data, error } = await supabase
        .from('imoveis')
        .select('cidade')
        .eq('status', 'disponivel')

      if (error) throw error
      
      const cidades = [...new Set(data.map(item => item.cidade))].filter(Boolean)
      console.log('✅ Cidades encontradas:', cidades)
      return cidades
      
    } catch (error) {
      console.error('❌ Erro ao buscar cidades:', error)
      throw error
    }
  },

  // Buscar bairros únicos (para o autocomplete)
  async getBairros() {
    try {
      console.log('🏘️ Buscando bairros')
      
      const { data, error } = await supabase
        .from('imoveis')
        .select('endereco, cidade')
        .eq('status', 'disponivel')

      if (error) throw error
      
      // Extrair bairros do endereço (assumindo que o bairro está no endereço)
      const bairros = [...new Set(
        data
          .map(item => {
            // Tenta extrair o bairro do endereço
            const endereco = item.endereco || ''
            // Supondo que o bairro é a primeira parte do endereço antes da vírgula
            const bairro = endereco.split(',')[0]?.trim()
            return bairro
          })
          .filter(bairro => bairro && bairro.length > 0)
      )]
      
      console.log('✅ Bairros encontrados:', bairros)
      return bairros
      
    } catch (error) {
      console.error('❌ Erro ao buscar bairros:', error)
      throw error
    }
  }
}

// Funções para corretores
export const corretoresService = {
  async getAllCorretores() {
    const { data, error } = await supabase
      .from('corretores')
      .select('*')
      .order('nome')

    if (error) throw error
    return data
  }
}