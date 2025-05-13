'use client'

import React from "react";
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { Button, AppBar, Toolbar, Typography, Container, Grid, Box, Link } from "@mui/material";

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
        return (
            <AppBar position="static" sx={{ bgcolor: "#FEECCF ", color: "black" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <a href="/">
                <Image src="/imgs/logolions.png" alt="Lions Clube" width={130} height={130} />
                </a>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, gap: 4, fontSize: 24} }>
                <Link href="#projeto" underline="hover" color="inherit" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}>Projetos</Link>
                <Link href="localizacao" underline="hover" color="inherit" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}>Localização</Link>
                <Link onClick={()=> window.location.href = 'mailto:Lionsclubecorumbams@gmail.com?subject=Contato%20pelo%20site'} underline="hover" color="inherit" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}>Contato</Link>
              </Box>
              <Button variant="contained" sx={{ bgcolor: "#1976d2", color: "white", fontWeight: "bold", fontFamily: "Arial, sans-serif" } } href="/login">Entrar</Button>
            </Toolbar>
          </AppBar>
    );
}
