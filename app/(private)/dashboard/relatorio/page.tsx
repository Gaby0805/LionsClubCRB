'use client'
import React from "react";
import Asside from "../../../componets/dash/asside";
import HeaderDash from "../../../componets/dash/headerdash";
import Charts from "../../../componets/chart";
import CircularProgress from '@mui/material/CircularProgress';
export default function Relatório() {

    return(
        <div className="flex h-screen  flex-col bg-amber bg-amber-100 " >


        <div className="flex flex-1">
        <Asside />
        <div className="flex flex-col w-full">


        <HeaderDash/>


        <main className="flex-1 bg-gray-200 overflow-auto  ">

        <Charts/>
        
        </main>

        </div>
        </div>

        </div>
    )


}



