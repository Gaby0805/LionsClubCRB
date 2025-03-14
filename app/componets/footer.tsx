import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import React from "react";

export default function Footer() {
    return (
        <footer className="w-full h-auto flex flex-col md:flex-row bg-blue-900 p-4">
            {/* Ícones Sociais */}
            <div className="flex flex-col justify-center items-center w-full md:w-36 mb-4 md:mb-0">
                <FaInstagram color="#ffd700" size={'34px'} />
                <CiFacebook color="#ffd700" size={'34px'} />
            </div>
            
            {/* Link */}
            <div className="flex justify-center md:justify-start w-full md:w-auto md:pt-7">
                <a className="text-[#ffd700] text-lg" href="">Site Lions Internacional</a>
            </div>
            
            {/* Endereço e Logo */}
            <div className="flex flex-col md:flex-row justify-between items-center md:ml-auto  p-2 w-full md:w-auto">
                <p className="text-white text-center md:text-left">
                    R. Vinte Um de Setembro, 2423 - Aeroporto,<br /> Corumbá - MS, 79320-110
                </p>
                <img src="imgs/newlogo.png" className="w-12 h-12 md:ml-4" alt="Logo" />
            </div>
        </footer>
    );
}