"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsuarioPage() {
    const { id } = useParams(); // 🔥 Captura o ID da URL
    const [usuario, setUsuario] = useState(null);


    if (!usuario) return <p>Carregando usuário...</p>; // Mostra enquanto carrega

    return (
        <div>
            <h1>Usuário ID: {id}</h1>
            <p>Nome: {usuario.nome_user}</p>
        </div>
    );
}
