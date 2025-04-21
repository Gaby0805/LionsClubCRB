'use client'

import React from 'react'

export function EmblaCarousel() {
  // Passando o plugin Autoplay e as opções

  return (
    <div className="embla h-[700px] w-full bLOCK">

      <h2 className="absolute mt-25  w-full  text-white text-6xl font-bold z-10 flex justify-center items-center ">
        Nos servimos
      </h2>


      <div className="embla__container">
        <div className="embla__slide"><img src="/imgs/carro/img1.jpg" alt="" width={'100%'} height={'100%'}/></div>
      </div>
    </div>
  )
}
