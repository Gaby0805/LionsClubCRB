'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define a estrutura esperada do contexto
interface UserContextType {
    userId: string | null;
    saveUserId: (id: string) => void;
}

// Cria o contexto com a estrutura tipada
const UserContext = createContext<UserContextType>({
    userId: null,
    saveUserId: () => {}, // Implementação padrão vazia
});

// Provider do contexto
export function UserProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const saveUserId = (id: string) => {
        setUserId(id);
        localStorage.setItem("user_id", id);
    };

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
