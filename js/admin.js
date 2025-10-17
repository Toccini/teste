// js/admin.js
import supabase from '../supabase.js'

document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticação
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    carregarEstatisticas();
    carregarImoveisAdmin();
    inicializarEventos();
});

// Logout
function inicializarEventos() {
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = 'login.html';
    });

    // Botão adicionar imóvel
    document.getElementById('addPropertyBtn').addEventListener('click', () => {
        document.getElementById('addPropertyModal').style.display = 'block';
    });

    // Fechar modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('addPropertyModal').style.display = 'none';
    });
}

// Carregar estatísticas
async function carregarEstatisticas() {
    const { data: imoveis, error } = await supabase
        .from('imoveis')
        .select('*');

    if (!error) {
        document.getElementById('totalProperties').textContent = imoveis.length;
        document.getElementById('availableProperties').textContent = 
            imoveis.filter(i => i.status === 'disponivel').length;
        document.getElementById('featuredProperties').textContent = 
            imoveis.filter(i => i.destaque).length;
    }
}

// Carregar imóveis na tabela admin
async function carregarImoveisAdmin() {
    const { data: imoveis, error } = await supabase
        .from('imoveis')
        .select('*')
        .order('criado_em', { ascending: false });

    if (error) {
        console.error('Erro ao carregar imóveis:', error);
        return;
    }

    const tbody = document.querySelector('#propertiesTable tbody');
    tbody.innerHTML = imoveis.map(imovel => `
        <tr>
            <td>${imovel.titulo}</td>
            <td>R$ ${formatarPreco(imovel.preco)}</td>
            <td>${imovel.tipo}</td>
            <td>${imovel.cidade}</td>
            <td>
                <span class="badge ${imovel.status === 'disponivel' ? 'bg-success' : 'bg-secondary'}">
                    ${imovel.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editarImovel('${imovel.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirImovel('${imovel.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Adicionar novo imóvel
window.adicionarImovel = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const preco = parseFloat(formData.get('preco').replace(/[^\d,]/g, '').replace(',', '.'));
    
    const imovelData = {
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        preco: preco,
        tipo: formData.get('tipo'),
        quartos: parseInt(formData.get('quartos')),
        banheiros: parseInt(formData.get('banheiros')),
        area: parseFloat(formData.get('area')),
        endereco: formData.get('endereco'),
        cidade: formData.get('cidade'),
        estado: formData.get('estado'),
        cep: formData.get('cep'),
        imagens: formData.get('imagens').split(',').map(url => url.trim()),
        destaque: formData.get('destaque') === 'on'
    };

    try {
        const { data, error } = await supabase
            .from('imoveis')
            .insert([imovelData]);

        if (error) throw error;

        alert('Imóvel cadastrado com sucesso!');
        document.getElementById('addPropertyModal').style.display = 'none';
        event.target.reset();
        carregarImoveisAdmin();
        carregarEstatisticas();

    } catch (error) {
        alert('Erro ao cadastrar imóvel: ' + error.message);
    }
}

// Funções auxiliares
function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(preco);
}

window.editarImovel = function(id) {
    alert('Editar imóvel: ' + id);
    // Implementar edição
}

window.excluirImovel = async function(id) {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
        const { error } = await supabase
            .from('imoveis')
            .delete()
            .eq('id', id);

        if (!error) {
            carregarImoveisAdmin();
            carregarEstatisticas();
        }
    }
}