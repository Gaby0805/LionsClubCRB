'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Define a estrutura esperada do contexto
interface UserContextType {
  userId: string | null;
  saveUserId: (id: string) => void;
}

// Cria o contexto com a estrutura tipada
const UserContext = createContext<UserContextType>({
  userId: null,
  saveUserId: () => {}, // Função padrão vazia para evitar erro
});

// Provider do contexto
export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

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

  // Ouve mudanças no localStorage feitas em outras abas/janelas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user_id') {
        setUserId(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userId, saveUserId }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useUser() {
  return useContext(UserContext);
}
