import {CircleUserRound, VenetianMaskIcon} from "lucide-react"
import { useUser } from "../context/UserContext"
import axios from "axios";
import { useEffect, useState } from "react";

export default function HeaderDash() {
    const { userId } = useUser(); 
    const [valor, setValor] = useState()
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://leoncio-backend-production.up.railway.app/usuario/especifico", {
                    id_usuario: userId // Envia o ID do usuário no body
                },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
                setValor(response.data.nome_user); // Atualiza o estado com o nome do usuário
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };

        if (userId) { // Garante que só faz a requisição se o userId estiver definido
            fetchData();
        }
    }, [userId]); // Executa sempre que userId mudar


    return(
        <div className="flex  h-16 bg-white  items-center mx-10 justify-between">

        <p className="font-bold text-2xl">{valor}</p>


        <div>
            <a href="/dashboard/usuarios">
            <CircleUserRound color="black" size={36}/>
            </a>
            
        </div>
        </div>
    )

}