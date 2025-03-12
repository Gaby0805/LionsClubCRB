'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  // Passando o plugin Autoplay e as opções
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })])

  return (
    <div className="embla" ref={emblaRef}>

      <h2 className="absolute mt-25 left-170  text-white text-6xl font-bold z-10 flex ">
        Nos servimos
      </h2>


      <div className="embla__container">
        <div className="embla__slide"><img src="/imgs/carro/img1.jpg" alt="" width={'100%'} height={'100%'}/></div>
        <div className="embla__slide"><img src="/imgs/carro/img2.jpg" alt="" width={'100%'} height={'100%'}/></div>
        <div className="embla__slide"><img src="/imgs/carro/img3.jpg" alt="" width={'100%'} height={'100%'}/></div>
      </div>
    </div>
  )
}
