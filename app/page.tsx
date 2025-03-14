'use client'
import React from "react";
import Header from "./componets/header";
import { EmblaCarousel } from "./componets/carrousel";
import Footer from "./componets/footer";
import { Concert_One, Lora } from "next/font/google";

const concertOne = Concert_One({ subsets: ["latin"], weight: "400" });
const lora = Lora({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="bg-[#FCE6B4] min-h-screen flex flex-col items-center">
      <Header />
      <EmblaCarousel />
      
      {/* Seção Sobre Nós */}
      <div className="w-full flex flex-col lg:flex-row items-center mt-28 px-4 lg:px-32 space-y-20 lg:space-y-0 lg:space-x-16">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h3 className={`text-4xl font-bold  px-32 mb-6 text-[#1A1A1A] ${concertOne.className}`}>Sobre nós</h3>
          <p className={`text-justify text-lg px-32 text-[#333] ${lora.className}`}>
            O Lions Clube de Corumbá é uma organização voluntária dedicada a servir a comunidade.
            Com o lema <strong>“Nós Servimos”</strong>, realizamos projetos nas áreas de saúde, educação e assistência social,
            buscando sempre promover o bem-estar e a união em nossa cidade.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/imgs/lions.png"
            className="w-10/12 md:w-[60%] lg:w-[80%] object-contain"
            alt="Lions Clube"
          />
        </div>
      </div>
      
      {/* Mensagem de Chamado para Ação */}
      <div className="w-full text-center mt-28 px-4">
        <h2 className={`text-2xl md:text-4xl font-bold text-[#1A1A1A] ${concertOne.className}`}>
          <span className="text-[#002E78]">Ajude aos Lions Clubes</span>
        </h2>
        <h2 className={`text-2xl md:text-4xl font-bold text-[#1A1A1A] ${concertOne.className}`}>
          a manter esse legado
        </h2>
      </div>
      
      <Footer />
    </main>
  );
}