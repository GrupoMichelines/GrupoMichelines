"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Dados dos banners
const banners = [
  {
    id: 1,
    title: "45 Anos de Tradição",
    description: "Celebrando quase meio século de excelência no serviço de táxi em São Paulo.",
    image: "/images/logos/logo-grupo-michelines-banner.png",
    buttonText: "Conheça nossa história",
    buttonLink: "#sobre",
    color: "from-blue-900 to-blue-700",
    isLogo: true,
  },
  {
    id: 2,
    title: "Parceria com DTáxi",
    description: "Acesso exclusivo ao Aeroporto de Congonhas para nossos motoristas.",
    image: "/images/banners/dtaxi-partnership.png",
    buttonText: "Saiba mais",
    buttonLink: "#veiculos",
    color: "from-green-700 to-green-500",
    isFullImage: true,
  },
  {
    id: 3,
    title: "Novos Veículos Disponíveis",
    description: "Frota renovada com os melhores modelos para você iniciar sua carreira.",
    image: "/images/banners/novo-polo-2025.jpeg",
    buttonText: "Ver veículos",
    buttonLink: "#veiculos",
    color: "from-blue-700 to-blue-500",
    isFullImage: true,
  },
]

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <div className="relative w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              {/* Usamos um container com aspect-ratio para garantir proporções consistentes */}
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] overflow-hidden rounded-lg">
                {banner.isLogo ? (
                  <div className="absolute inset-0 bg-white z-10 flex items-center justify-center flex-col px-4 text-center">
                    <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto">
                      <Image
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.title}
                        width={800}
                        height={400}
                        className="object-contain mx-auto max-h-[120px] sm:max-h-[180px] md:max-h-[220px] lg:max-h-[280px]"
                        priority
                        quality={95}
                      />
                    </div>
                    <div
                      className={`mt-4 sm:mt-6 lg:mt-8 w-full max-w-2xl mx-auto bg-gradient-to-r ${banner.color} px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-md`}
                    >
                      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">{banner.title}</h2>
                      <p className="text-sm sm:text-base lg:text-lg text-white mt-1 sm:mt-2">{banner.description}</p>
                      <Link href={banner.buttonLink} className="inline-block mt-3 sm:mt-4">
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                          {banner.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : banner.isFullImage ? (
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover object-center"
                      priority={index === 1 || index === 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                      quality={95}
                    />
                    {/* Overlay gradiente para melhorar a legibilidade do botão */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-20 max-w-full px-2">
                      <Link href={banner.buttonLink}>
                        <Button
                          size="sm"
                          className={`${
                            index === 1
                              ? "bg-white text-green-700 hover:bg-gray-100"
                              : "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                          } font-bold whitespace-nowrap text-sm sm:text-base`}
                        >
                          {banner.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    {/* Título e descrição para melhorar SEO e acessibilidade */}
                    <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 z-20 max-w-md">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white bg-black/40 inline-block px-3 py-2 rounded">
                        {banner.title}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-60 z-10`} />
                    <Image
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover object-center"
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                      quality={95}
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-4 py-4 sm:px-8 sm:py-10 lg:px-16 lg:py-12 max-w-full sm:max-w-3xl">
                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                        {banner.title}
                      </h2>
                      <p className="text-sm sm:text-lg lg:text-xl text-white mb-3 sm:mb-6">{banner.description}</p>
                      <Link href={banner.buttonLink}>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                          {banner.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-30" />
        <CarouselNext className="right-4 z-30" />

        {/* Indicadores */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-white/50"
              } transition-all duration-300`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
