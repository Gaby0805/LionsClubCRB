'use client'
import Asside from "../../../componets/dash/asside";

import React, { useState, useEffect } from 'react';
import Invent from "@/app/componets/inventory";
import HeaderDash from "../../../componets/dash/headerdash";
import Invent2 from "@/app/componets/inventgeral";
export default function inventario() {




    return(
        <div className="flex h-screen w-full " >


        <Asside />
        <div className="flex flex-col w-full">



        <HeaderDash/>


        <main className="flex-1 bg-gray-200 h-full  w-full flex justify-center ">

        
        <Invent2/>
        </main>

        </div>

        </div>
    )


}



