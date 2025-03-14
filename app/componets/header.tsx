import React from "react";
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { Concert_One, Akatab } from "next/font/google"

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
        return (
            <a href="/login">
                <button type="button" className={`${Concert_Onefont.className} h-12 w-32 md:h-14 md:w-44 text-xl md:text-3xl bg-amber-400 rounded-md shadow-md transition-transform transform hover:scale-105`}>
                    Entrar
                </button>
            </a>
        );
    };

    return (
        <header className="w-full flex items-center justify-between p-3 md:p-6 bg-amber-100 shadow-md">
            {/* Logo */}
            <div className="flex-shrink-0 ">
                <Image 
                    src={'/imgs/LogoLions.png'}
                    width={300} 
                    height={300} 
                    alt="Logo Lions"
                    className="w-[300px]"
                />
            </div>

            {/* Menu Navegação */}
            <nav className={`hidden md:flex space-x-4 md:space-x-10 ${akatabfont.className} text-xl md:text-3xl`}>
                <h2 className="cursor-pointer hover:text-amber-500 transition">Projeto</h2>
                <h2 className="cursor-pointer hover:text-amber-500 transition">Localização</h2>
                <h2 className="cursor-pointer hover:text-amber-500 transition">Contato</h2>
            </nav> 

            {/* Botão de Entrar */}
            <div className="flex-shrink-0">
                <Entrar/> 
            </div>
        </header>
    );
}
