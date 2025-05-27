"use client";
import React, { useState } from "react";
import { Copse, Concert_One } from "next/font/google";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useUser } from "../../componets/context/UserContext";

const copsefont = Copse({ subsets: ["latin"], weight: "400" });
const Concert_Onefont = Concert_One({ subsets: ["latin"], weight: "400" });


export default function Home() {
  // Estados para armazenar email e senha3
  const {saveUserId} = useUser()
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // Função para autenticar usuário
  const autorizar = async () => {
    try {
      const response = await axios.post(
        "https://leoncio-backend-production.up.railway.app/usuario/autenticar", 
        { email, senha },
        { withCredentials: true }
      );
      
      // Verificar se a resposta foi bem-sucedida
      if (response.data.success === false) {
        alert("Falha no login. Verifique suas credenciais.");
        return;
      }
  
      // Armazenar ID do usuário
      saveUserId(response.data.id_usuario); 
  
      console.log("Login realizado com sucesso:", response.data);
  
      // Redirecionar para o dashboard após o login bem-sucedido
      alert("Login realizado com sucesso!");
      router.push('/dashboard');
      
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Falha no sistema, tente novamente");
    }
  };
  
  return (
    <main className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/imgs/login.png)' }}>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-96 border-2 border-white rounded-2xl flex justify-center items-center flex-col" 
             style={{ height: 500, backgroundColor: "rgba(21, 78, 157, 0.7)" }}>
          
          <div className="flex justify-center h-full w items-center flex-col opacity-100 text-white">
            <h3 className="text-white text-4xl w-max">Login</h3>

            {/* Input Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${copsefont.className} bg-gray-400 w-72 h-11 rounded-md text-xl font-bold p-3 opacity-80 mt-5`}
            />

            {/* Input Senha */}
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`${copsefont.className} bg-gray-400 w-72 h-11 rounded-md text-xl font-bold p-3 opacity-80 mt-5`}
            />

            <p className="mr-32 mt-1 font-bold underline">Esqueci minha senha</p>

            {/* Botão de Login */}
            <button 
              onClick={autorizar} 
              className={`${Concert_Onefont.className} h-13 w-44 text-2xl bg-amber-400 rounded-md mt-4`}>
              Entrar
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
