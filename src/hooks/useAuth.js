// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('useAuth: Iniciando verificação de sessão...')
    
    // Pegar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('useAuth: Sessão atual:', session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Ouvir mudanças de auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('useAuth: Mudança de auth - Evento:', event, 'Sessão:', session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    console.log('useAuth: Tentando signIn com:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('useAuth: Resposta signIn:', { data, error })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    signIn,
    signOut,
  }
}