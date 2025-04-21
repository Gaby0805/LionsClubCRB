'use client'
import React from "react";
import Asside from "../../../componets/dash/asside";
import HeaderDash from "../../../componets/dash/headerdash";
import CircularProgress from '@mui/material/CircularProgress';
export default function Relatório() {

    return(
        <div className="flex h-screen  flex-col overflow-hidden" >


        <div className="flex flex-1">
        <Asside />
        <div className="flex-col w-full">


        <HeaderDash/>


        <main className="flex-1 bg-gray-200 h-full flex justify-center items-center flex-col  ">

                <h1 className="text-2xl mb-5 " >O site está adquirindo informações para a geração do relatorio, por favor,  2 semanas para o relatorio completo</h1>


                <CircularProgress size={'5%'}/>
        </main>

        </div>
        </div>

        </div>
    )


}



