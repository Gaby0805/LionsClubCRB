import React from "react";
import Image from "next/image";
import { Button, AppBar, Toolbar, Typography, Container, Grid, Box, Link } from "@mui/material";
import Footer from "@/app/componets/footer";
import Header from "@/app/componets/header";
import EmailCard from "@/app/componets/cardemail";


export default function Projetos() {
  return (
    <div className="flex flex-col min-h-screen "style={{backgroundColor: '#FEECCF'}}>
      <Header/>



    <Container className=" flex-1  w-fit flex justify-center items-center"style={{backgroundColor: '#FEECCF'}}>
        
        <div className=" flex flex-col justify-center items-center border p-4 rounded-3xl border-gray-400 ">
          <h2 className="text-[24px] mb-10">
            Email para contato
          </h2>
        
        <div className="">
            <EmailCard/>
        </div>

        </div>

    </Container>



      <Footer/>
    </div>
  );
}
