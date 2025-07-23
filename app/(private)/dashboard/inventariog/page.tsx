'use client'
import Asside from "../../../components/dash/asside";

import React, { useState, useEffect } from 'react';
import Invent from "@/app/components/inventario/inventory";
import HeaderDash from "../../../components/dash/headerdash";
import Invent2 from "@/app/components/inventario/inventgeral";
import { useRouter } from "next/navigation";

export default function inventario() {
        const router = useRouter();
        useEffect(() => {
          const token = localStorage.getItem("token");
  
          if (!token) {
              router.push("/login");
          }
      }, []); 



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



