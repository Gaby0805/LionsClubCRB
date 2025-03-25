import { useParams } from "next/navigation";

export default function UsuarioPage() {
    const { id } = useParams(); // 🔥 Pegando o ID da URL dinâmica

    return <h1>Usuário ID: {id}</h1>;
}
