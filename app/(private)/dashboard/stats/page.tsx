'use client'
import React, { useEffect, useState } from "react";
import Asside from "../../../componets/dash/asside";
import HeaderDash from "../../../componets/dash/headerdash";
import Statuscomodato from "@/app/componets/statusitem";
import axios from "axios";
import Itempage from "@/app/componets/pagination";
import { listClasses } from "@mui/material";


export default function Dashboard() {
    const [item, setItem] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get("http://localhost:3333/transacao/info",
              {withCredentials: true});
            setItem(response.data);
          } catch (error) {
            console.log("Erro ao buscar dados:", error);
          }
        };
        fetchData();
      },[]);
      // const listaitem = item.

    return(
        <div className="flex flex-col overflow-hidden" >


        <div className="flex flex-1">
        <Asside />
        <div className="flex flex-col w-full">


        <HeaderDash/>


        <main className="flex-1 bg-gray-200 h-screen flex flex-col overflow-auto">
            <div className="flex m-5 flex-col flex-1">
                <div className=" text-3xl">
                    Status comodato
                </div>

                <div className="p-4 ">
                  <ul className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                    {item.map((itens:Array<any>) => (
                      <li key={itens.id_comodato} className="break-inside-avoid  p-3 rounded-lg ">
                        <Statuscomodato nome={itens.nome_comodato} status={itens.status} data={new Date(itens.data_limite).toISOString().split('T')[0]}/>
                      </li>
                    ))}
                    
                  </ul>
                </div>

                <div className="mt-auto flex justify-center">
                   <Itempage/>

                </div>
            
            </div>
        </main>

        </div>
        </div>

        </div>
    )


}



