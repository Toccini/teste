// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import './Admin.css';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('imoveis');
  const [editingImovel, setEditingImovel] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    preco: '',
    tipo: 'casa',
    tipo_negocio: 'venda',
    quartos: 1,
    banheiros: 1,
    area: '',
    endereco: '',
    cidade: '',
    estado: '',
    imagens: '',
    destaque: false,
    status: 'disponivel'
  });

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
      return;
    }

    if (user) {
      carregarImoveis();
      carregarPerfilUsuario();
    }
  }, [user, authLoading]);

  const carregarImoveis = async () => {
    try {
      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setImoveis(data || []);
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarPerfilUsuario = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('perfis')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setUserProfile({
          nome: user.email?.split('@')[0] || 'Corretor',
          avatar_url: null
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        tipo: formData.tipo,
        tipo_negocio: formData.tipo_negocio,
        quartos: parseInt(formData.quartos),
        banheiros: parseInt(formData.banheiros),
        area: parseFloat(formData.area),
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado,
        imagens: formData.imagens.split(',').map(url => url.trim()).filter(url => url),
        destaque: formData.destaque,
        status: formData.status
      };

      let error;
      
      if (editingImovel) {
        const { error: updateError } = await supabase
          .from('imoveis')
          .update(propertyData)
          .eq('id', editingImovel.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('imoveis')
          .insert([propertyData]);
        error = insertError;
      }

      if (error) throw error;

      alert(editingImovel ? 'Imóvel atualizado com sucesso!' : 'Imóvel cadastrado com sucesso!');
      
      setFormData({
        titulo: '',
        descricao: '',
        preco: '',
        tipo: 'casa',
        tipo_negocio: 'venda',
        quartos: 1,
        banheiros: 1,
        area: '',
        endereco: '',
        cidade: '',
        estado: '',
        imagens: '',
        destaque: false,
        status: 'disponivel'
      });
      
      setEditingImovel(null);
      setActiveSection('imoveis');
      carregarImoveis();

    } catch (error) {
      alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este imóvel?')) return;

    try {
      const { error } = await supabase
        .from('imoveis')
        .delete()
        .eq('id', id);

      if (error) throw error;

      carregarImoveis();
    } catch (error) {
      alert('Erro ao excluir imóvel: ' + error.message);
    }
  };

  const handleEditProperty = (imovel) => {
    setEditingImovel(imovel);
    setFormData({
      titulo: imovel.titulo,
      descricao: imovel.descricao,
      preco: imovel.preco.toString(),
      tipo: imovel.tipo,
      tipo_negocio: imovel.tipo_negocio || 'venda',
      quartos: imovel.quartos,
      banheiros: imovel.banheiros,
      area: imovel.area.toString(),
      endereco: imovel.endereco,
      cidade: imovel.cidade,
      estado: imovel.estado,
      imagens: imovel.imagens?.join(', ') || '',
      destaque: imovel.destaque,
      status: imovel.status
    });
    setActiveSection('cadastrar');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/login';
    }
  };

  const handleNewProperty = () => {
    setEditingImovel(null);
    setFormData({
      titulo: '',
      descricao: '',
      preco: '',
      tipo: 'casa',
      tipo_negocio: 'venda',
      quartos: 1,
      banheiros: 1,
      area: '',
      endereco: '',
      cidade: '',
      estado: '',
      imagens: '',
      destaque: false,
      status: 'disponivel'
    });
    setActiveSection('cadastrar');
  };

  const getNegocioBadge = (tipoNegocio) => {
    switch(tipoNegocio) {
      case 'venda':
        return { text: 'Venda', class: 'admin-negocio-venda' };
      case 'aluguel':
        return { text: 'Aluguel', class: 'admin-negocio-aluguel' };
      case 'ambos':
        return { text: 'Venda/Aluguel', class: 'admin-negocio-ambos' };
      default:
        return { text: 'Venda', class: 'admin-negocio-venda' };
    }
  };

  if (authLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Painel Admin</h2>
        </div>
        
        <nav className="admin-sidebar-nav">
          <button 
            className={`admin-nav-item ${activeSection === 'imoveis' ? 'admin-nav-active' : ''}`}
            onClick={() => setActiveSection('imoveis')}
          >
            <i className="fas fa-home"></i>
            Meus Imóveis
          </button>
          
          <button 
            className={`admin-nav-item ${activeSection === 'cadastrar' ? 'admin-nav-active' : ''}`}
            onClick={handleNewProperty}
          >
            <i className="fas fa-plus"></i>
            Cadastrar Imóvel
          </button>
          
          <button 
            className="admin-nav-item admin-logout-btn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            Sair
          </button>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="admin-main">
        {/* Header com Boas-vindas */}
        <div className="admin-header">
          <div className="admin-welcome-section">
            <h1>Bem-vindo, {userProfile?.nome || 'Corretor'}!</h1>
            <p>Gerencie seus imóveis de forma simples e eficiente</p>
          </div>
          <div className="admin-user-profile">
            <div className="admin-user-avatar">
              {userProfile?.avatar_url ? (
                <img src={userProfile.avatar_url} alt="Avatar" />
              ) : (
                <div className="admin-avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{userProfile?.nome || 'Corretor'}</span>
              <span className="admin-user-email">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {/* Seção: Meus Imóveis */}
          {activeSection === 'imoveis' && (
            <div className="admin-content-section">
              <div className="admin-section-header">
                <h2>Meus Imóveis ({imoveis.length})</h2>
                <button className="admin-btn admin-btn-primary" onClick={handleNewProperty}>
                  <i className="fas fa-plus"></i>
                  Novo Imóvel
                </button>
              </div>

              {loading ? (
                <div className="admin-loading-text">Carregando imóveis...</div>
              ) : imoveis.length === 0 ? (
                <div className="admin-empty-state">
                  <i className="fas fa-home"></i>
                  <h3>Nenhum imóvel cadastrado</h3>
                  <p>Comece cadastrando seu primeiro imóvel</p>
                  <button className="admin-btn admin-btn-primary" onClick={handleNewProperty}>
                    Cadastrar Primeiro Imóvel
                  </button>
                </div>
              ) : (
                <div className="admin-properties-grid">
                  {imoveis.map((imovel) => {
                    const negocioBadge = getNegocioBadge(imovel.tipo_negocio);
                    return (
                      <div key={imovel.id} className="admin-property-card">
                        <div className="admin-property-image">
                          {imovel.imagens && imovel.imagens.length > 0 ? (
                            <img src={imovel.imagens[0]} alt={imovel.titulo} />
                          ) : (
                            <div className="admin-no-image">
                              <i className="fas fa-home"></i>
                            </div>
                          )}
                          {imovel.destaque && <div className="admin-featured-badge">Destaque</div>}
                          <div className="admin-property-type">{imovel.tipo}</div>
                        </div>
                        
                        <div className="admin-property-content">
                          <h3 className="admin-property-title">{imovel.titulo}</h3>
                          
                          <div className="admin-property-location">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{imovel.endereco} {imovel.cidade} - {imovel.estado}</span>
                          </div>

                          <div className="admin-price-section">
                            <span className="admin-property-price">
                              R$ {imovel.preco?.toLocaleString('pt-BR')}
                            </span>
                            <span className={`admin-negocio-badge ${negocioBadge.class}`}>
                              {negocioBadge.text}
                            </span>
                          </div>

                          <div className="admin-property-details">
                            <div className="admin-detail">
                              <i className="fas fa-bed"></i>
                              <span>{imovel.quartos} Quarto{imovel.quartos !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="admin-detail">
                              <i className="fas fa-bath"></i>
                              <span>{imovel.banheiros} Banheiro{imovel.banheiros !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="admin-detail">
                              <i className="fas fa-ruler-combined"></i>
                              <span>{imovel.area}m²</span>
                            </div>
                          </div>

                          <div className="admin-property-footer">
                            <div className={`admin-status-badge admin-status-${imovel.status}`}>
                              {imovel.status === 'disponivel' ? 'Disponível' : 
                               imovel.status === 'vendido' ? 'Vendido' : 'Alugado'}
                            </div>
                            <div className="admin-property-actions">
                              <button 
                                className="admin-btn-edit"
                                onClick={() => handleEditProperty(imovel)}
                                title="Editar"
                              >Editar
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="admin-btn-delete"
                                onClick={() => handleDeleteProperty(imovel.id)}
                                title="Excluir"
                              >Excluir
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Seção: Cadastrar/Editar Imóvel */}
          {activeSection === 'cadastrar' && (
            <div className="admin-content-section">
              <div className="admin-section-header">
                <h2>{editingImovel ? 'Editar Imóvel' : 'Cadastrar Imóvel'}</h2>
                <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setActiveSection('imoveis')}
                >
                  <i className="fas fa-arrow-left"></i>
                  Voltar para lista
                </button>
              </div>

              <div className="admin-form-container">
                <form onSubmit={handleSubmit}>
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Título *</label>
                      <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                        required
                        placeholder="Ex: Casa com 3 quartos na praia"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Preço *</label>
                      <input
                        type="number"
                        value={formData.preco}
                        onChange={(e) => setFormData({...formData, preco: e.target.value})}
                        required
                        placeholder="Ex: 350000"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Tipo do Imóvel *</label>
                      <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                      >
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="comercial">Comercial</option>
                        <option value="sala">Sala Comercial</option>
                        <option value="sobrado">Sobrado</option>
                        <option value="kitnet">Kitnet</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label>Tipo de Negócio *</label>
                      <select
                        value={formData.tipo_negocio}
                        onChange={(e) => setFormData({...formData, tipo_negocio: e.target.value})}
                      >
                        <option value="venda">Venda</option>
                        <option value="aluguel">Aluguel</option>
                        <option value="ambos">Venda e Aluguel</option>
                      </select>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Status *</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="disponivel">Disponível</option>
                        <option value="vendido">Vendido</option>
                        <option value="alugado">Alugado</option>
                      </select>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Quartos</label>
                      <input
                        type="number"
                        value={formData.quartos}
                        onChange={(e) => setFormData({...formData, quartos: e.target.value})}
                        min="0"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Banheiros</label>
                      <input
                        type="number"
                        value={formData.banheiros}
                        onChange={(e) => setFormData({...formData, banheiros: e.target.value})}
                        min="1"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Área (m²) *</label>
                      <input
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        required
                        placeholder="Ex: 120"
                      />
                    </div>
                    
                    <div className="admin-form-group admin-full-width">
                      <label>Endereço *</label>
                      <input
                        type="text"
                        value={formData.endereco}
                        onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                        required
                        placeholder="Ex: Rua das Flores, 123"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Cidade *</label>
                      <input
                        type="text"
                        value={formData.cidade}
                        onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                        required
                        placeholder="Ex: São Paulo"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Estado *</label>
                      <input
                        type="text"
                        value={formData.estado}
                        onChange={(e) => setFormData({...formData, estado: e.target.value})}
                        required
                        placeholder="Ex: SP"
                      />
                    </div>
                    
                    <div className="admin-form-group admin-full-width">
                      <label>Descrição *</label>
                      <textarea
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        required
                        rows="4"
                        placeholder="Descreva o imóvel..."
                      />
                    </div>
                    
                    <div className="admin-form-group admin-full-width">
                      <label>Imagens (URLs separadas por vírgula)</label>
                      <input
                        type="text"
                        value={formData.imagens}
                        onChange={(e) => setFormData({...formData, imagens: e.target.value})}
                        placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg"
                      />
                      <small className="admin-form-help">Coloque as URLs das imagens separadas por vírgula</small>
                    </div>
                    
                    <div className="admin-form-group admin-full-width">
                      <label className="admin-checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.destaque}
                          onChange={(e) => setFormData({...formData, destaque: e.target.checked})}
                        />
                        <span className="admin-checkmark"></span>
                        Imóvel em destaque
                      </label>
                    </div>
                  </div>
                  
                  <div className="admin-form-actions">
                    <button 
                      type="button" 
                      className="admin-btn admin-btn-secondary"
                      onClick={() => setActiveSection('imoveis')}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="admin-btn admin-btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Salvando...' : (editingImovel ? 'Atualizar Imóvel' : 'Cadastrar Imóvel')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 