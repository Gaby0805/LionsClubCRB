"use client";
import { useRouter } from "next/navigation";
import React,{ useEffect } from "react";

import UsuariosLista from "@/app/components/tela_usuario/principal_usuario";

export default function Page() {
        const router = useRouter();
        useEffect(() => {
          const token = localStorage.getItem("token");
  
          if (!token) {
              router.push("/login");
          }
      }, []); 
  return <UsuariosLista />;
}
