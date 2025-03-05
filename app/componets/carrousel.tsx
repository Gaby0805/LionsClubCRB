'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="embla mx-auto mt-30 w-screen   " ref={emblaRef} style={{ height: 550 }}>
      {/* Texto que ficará sobre as imagens */}
      <h2 className="absolute mt-25 left-60  text-white text-4xl font-bold z-10 flex ">
        TEXTO PARA APARECER EM CIMA DE TODAS AS IMAGENS
      </h2>

      <div className="embla__container h-full">
        <div className="embla__slide flex items-center justify-center bg-amber-400"></div>
        <div className="embla__slide flex items-center justify-center bg-amber-500"></div>
        <div className="embla__slide flex items-center justify-center bg-amber-600"></div>
      </div>
    </div>
  )
}
