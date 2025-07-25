'use client'
import React from "react";
import Image from "next/image";
import { Button, AppBar, Toolbar, Typography, Container, Grid, Box, Link } from "@mui/material";
import Footer from "@/app/components/pre_login/footer";
import Header from "@/app/components/pre_login/header";
import EmailCard from "@/app/components/pre_login/cardemail";


export default function Projetos() {
  return (
    <div className="flex flex-col min-h-screen "style={{backgroundColor: '#FEECCF'}}>
      <Header/>



    <Container className=" flex-1  w-fit flex justify-center items-center"style={{backgroundColor: '#FEECCF'}}>
        
        <div className=" flex flex-col justify-center items-center p-4 ">
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
