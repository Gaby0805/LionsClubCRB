'use client'
import Asside from "../../componets/dash/asside";

import React, { useState, useEffect } from 'react';
import Invent from "@/app/componets/inventory";
import HeaderDash from "../../componets/dash/headerdash";
export default function inventario() {




    return(
        <div className="flex h-screen  flex-col overflow-hidden" >


        <div className="flex flex-1">
        <Asside />
        <div className="flex-col w-full">



        <HeaderDash/>


        <main className="flex-1 bg-gray-200 h-full flex justify-center  ">

        <Invent/>
        
        </main>

        </div>
        </div>

        </div>
    )


}



