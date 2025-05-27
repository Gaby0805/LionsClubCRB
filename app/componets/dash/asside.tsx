import { BookOpen, Backpack, FileSpreadsheet, NotepadText } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function Asside() {
  const { userId } = useUser();
  
  const [isUser, setUser] = useState("hidden")
  const [isUser2, setUser2] = useState("hidden")
    const [Infosearch, setInfosearch] = useState({
      nome_user: "",
      sobrenome: "",
      email: "",
      cpf: "",
      senha: "", // <- campo senha incluído
      tipo_user: "",

    }); 
       useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://leoncio-backend-production.up.railway.app/usuario/especifico",
            {
              id_usuario: userId,
            },
            { withCredentials: true }
          );

          setInfosearch({
            nome_user: response.data.nome_user,
            sobrenome: response.data.sobrenome_user,
            email: response.data.email,
            cpf: response.data.cpf,
            tipo_user: response.data.tipo_user,
            senha: "", // senha não vem da API, mas o campo é obrigatório no state
          });

          if (response.data.tipo_user === "ADM/Presidente"   ||response.data.tipo_user === "Vice" ||response.data.tipo_user === "Diretor de Patrimonio"  ){
            setUser("");
          }
          if (response.data.tipo_user === "ADM/Presidente" ||response.data.tipo_user === "1º secretária"   ||response.data.tipo_user === "Vice" ||response.data.tipo_user === "Diretor de Patrimonio"  ){
            setUser2("");
          }
        } catch (error) {
          console.log("Erro ao buscar dados:", error);
        }
      };

      if (userId) {
        fetchData();
      }
    }, [userId]);
  
    return (
    <div
      className="w-60 h-scree rounded-r-xl "
      style={{ backgroundColor: "#4C506B",}}
    >
    <nav className="text-white flex flex-col justify-between h-full w-full">
        <div className="flex flex-col justify-center items-center gap-9 mt-15">
          <div className={`flex items-center ${isUser2}`}>
            <BookOpen />
            <a className="ml-3" href="/dashboard/comodato">
              realizar contrato
            </a>
          </div>
          <div className="flex items-center">
            <Backpack />
            <a className="ml-3" href="/dashboard/inventario">
              Inventário Comodato
            </a>
          </div>
          
          <div className={`flex items-center ${isUser} `}>
            <Backpack />
            <a className="ml-3" href="/dashboard/inventariog">
              Inventário Patrimonial
            </a>
          </div>
          <div className="flex items-center">
            <FileSpreadsheet />
            <a className="ml-4" href="relatorio">Relatório</a>
          </div>
          <div className="flex items-center">
            <NotepadText/>
            <a className="ml-4 flex flex-wrap" href="/dashboard/stats">Status <br />Comodato</a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mb-6">
          <a href="/dashboard">
            <img src="/imgs/LogoLeoncio.png" alt="Logo" className="w-20" />
          </a>
        </div>
      </nav>
    </div>
  );
}
