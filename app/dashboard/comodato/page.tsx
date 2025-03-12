'use client'
import React, { useState, useEffect } from "react";
import Asside from "../../componets/dash/asside";
import HeaderDash from "../../componets/dash/headerdash";
import { Checkbox } from "@mui/material";
import '@fontsource/roboto/300.css';
import axios from "axios";

export default function Comodato() {

      const [item, setitem] = useState([])

      useEffect(() => {
          const fetchData = async () => {
              try { 
                  const response = await axios.get("http://localhost:3333/estoque/ComodatoListtext");
                  console.log(response.data);
                  setitem(response.data);
              } catch (error) {
                  console.log("Erro ao buscar dados:", error);
              }
          };
          
          fetchData();
      }, []);
      


  return (
    <div className="flex w-full h-full">
      <Asside />
      <div className="flex flex-1">
        <div className="flex flex-col w-full">
          <HeaderDash />
          <main className="flex-1 h-full w-full bg-gray-100 p-5">
            <h1 className="text-4xl font-bold mb-5">Cadastro</h1>

            {/* Grid Responsivo: 2 colunas em telas grandes, 1 em telas pequenas */}
            <div className="grid xl:grid-cols-4  gap-5">
              {/* Primeira Coluna */}
              <div className="space-y-4">
                {[
                  "Nome", "CPF", "Profissão", "CEP", "Bairro", "Cidade", "Telefone"
                ].map((label) => (
                  <div key={label} className="flex flex-col">
                    <p>{label}</p>
                      <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                ))}
                <div className="flex flex-col mt-5">
                  <p>Realizado por:</p>
                  <input type="text" className="h-12 rounded-md bg-gray-300 p-2 w-1/2" disabled={true} placeholder="Ana Karina"/>
                </div>
              </div>

              {/* Segunda Coluna */}
              <div className="space-y-4">
                {[
                  "Sobrenome", "RG", "Complemento", "Estado"
                ].map((label) => (
                  <div key={label} className="flex flex-col">
                    <p>{label}</p>
                    <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                ))}
                {/* Estado Civil e Nacionalidade lado a lado */}
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col">
                    <p>Estado Civil</p>
                    <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p>Nacionalidade</p>
                    <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                </div>
                {/* Rua e Número */}
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col">
                    <p>Rua</p>
                    <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                  <div className="w-1/4 flex flex-col">
                    <p>Nº</p>
                    <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                </div>
                {/* Telefone e Whatsapp Checkbox */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 flex flex-col">
                    <p>Telefone</p>
                    <input type="text" className="h-12 rounded-md bg-gray-300 p-2" />
                  </div>
                  <div className="flex items-center flex-row-reverse gap-2">
                    <p>Whatsapp</p>
                    <Checkbox color="default" />
                  </div>
                </div>
              </div>
                <div></div>
                <div className="flex flex-col text-2xl items-start ml-15 justify-between">
                    
                    
                    <div>
                    <h3>Itens Solictados</h3>

                    {
                      item.map((item, index) => (
                    <div key={index} className="flex  ">
                    <Checkbox/>
                    <p>{item.nome_material}</p>
                    </div>
                      ) 
                    )}
  
                    </div>


                    <div className="">
                    <button className="w-50 h-15 bg-gray-200 rounded-2xl">Enviar</button>
                    </div>


                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}