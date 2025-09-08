'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import axios from 'axios';
import {api} from "../../components/uteis/api"

// Define a estrutura esperada do contexto
interface UserContextType {
  userId: string | null;
  nomeUser: string;
  saveUserId: (id: string) => void;
}

// Cria o contexto com valores padrão
const UserContext = createContext<UserContextType>({
  userId: null,
  nomeUser: '',
  saveUserId: () => {},
});

// Provider do contexto
export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [nomeUser, setNomeUser] = useState<string>('');

  // Ao montar, tenta carregar o userId do localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Atualiza o estado e o localStorage ao salvar o userId
  const saveUserId = useCallback((id: string) => {
    setUserId(id);
    localStorage.setItem('user_id', id);
  }, []);

  // Busca o nome do usuário ao mudar o userId
  useEffect(() => {
    const fetchNomeUser = async () => {
      const token = localStorage.getItem('token');
      if (!userId || !token) return;

      try {
        const response = await api.post(
          'usuario/especifico',
          { id_usuario: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNomeUser(response.data.nome_user);
      } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
      }
    };

    fetchNomeUser();
  }, [userId]);

  // Ouve mudanças no localStorage feitas em outras abas/janelas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user_id') {
        setUserId(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ userId, saveUserId, nomeUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useUser() {
  return useContext(UserContext);
}
