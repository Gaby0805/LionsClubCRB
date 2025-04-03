"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
    userId: null,
    saveUserId: ()=> {}

});

export function UserProvider({children}) {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const saveUserId = (id_usuario) => {
        setUserId(id_usuario);
        localStorage.setItem("user_id", id_usuario);
    };

    return (
        <UserContext.Provider value={{ userId, saveUserId }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
