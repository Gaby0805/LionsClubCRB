'use client'
import React,{ useEffect } from "react";
import Asside from "../../components/dash/asside";
import HeaderDash from "../../components/dash/headerdash";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const transition = {
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }
      const router = useRouter();
      useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // Se não tiver token, redireciona para o login
            router.push("/login");
        }
    }, []); 
      
    const Logo = () => {
        return(
            <img className="mt-30" src="/imgs/newlogo.png" alt=""  width={300}/>
        )
    }
    return(
        <div className="flex h-screen  flex-col overflow-hidden" >


        <div className="flex flex-1">
        <Asside />
        <div className="flex-col w-full">


        <HeaderDash/>


        <main className="flex-1 bg-gray-200 h-full flex justify-center  ">
            
            <motion.div 
            className="flex-col flex m-20 text-3xl items-center"
            initial={{ opacity: 0, y: 30 }} // Começa invisível e deslocado para baixo
            animate={{ opacity: 1, y: 0 }} // Fica visível e sobe
            transition={{
            duration: 3,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
        }}
    >
                <p> 
                    Bem-vindo ao sistema do Lions Club Corumbá 
                    
                </p>   
                <img className="mt-30" src="/imgs/newlogo.png" width={400} alt="" />
           </motion.div>

        </main>

        </div>
        </div>

        </div>
    )


}



