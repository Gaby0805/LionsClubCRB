import React from "react";
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import {  Concert_One, Akatab } from "next/font/google"
const Concert_Onefont = Concert_One({
    subsets: ["latin"],
    weight: "400",
  }) 
const akatabfont = Akatab({
subsets: ["latin"],
weight: "400",
}) 


export default function Header() {
    const Entrar = () => {
        return(
          <button type="button" className={`${Concert_Onefont.className} h-18 w-44 text-3xl bg-amber-400 rounded-md  `}> Entrar</button>
        )
      }

    
    return (
        <main className="w-full h flex p-3" style={{alignItems: "center"}}>
            <Image 
            src={'/imgs/LogoLions.png'}
            width={300}
            height={300}
            alt="Logo LIons"
            />
            <nav className={`flex flex-1 space-x-10 align-middle justify-center pr-5 text-4xl ${akatabfont.className}`}>
            <h2>Projeto</h2>
            <h2>Localização</h2>
            <h2>Contato</h2>
            
            </nav> 
            <Entrar/> 
            

            
        </main>


    )

} 