// js/login.js
import supabase from './supabase.js'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Criar perfil do usuário se não existir
        await criarPerfilUsuario(data.user);
        
        message.innerHTML = '<div class="alert alert-success">Login realizado com sucesso!</div>';
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);

    } catch (error) {
        message.innerHTML = `<div class="alert alert-danger">Erro: ${error.message}</div>`;
    }
});

async function criarPerfilUsuario(user) {
    const { data: perfilExistente } = await supabase
        .from('perfis')
        .select('id')
        .eq('id', user.id)
        .single();

    if (!perfilExistente) {
        await supabase
            .from('perfis')
            .insert([
                {
                    id: user.id,
                    email: user.email,
                    nome: user.email.split('@')[0], // Nome baseado no email
                    nivel_acesso: 'admin'
                }
            ]);
    }
}