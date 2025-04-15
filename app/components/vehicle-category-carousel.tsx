"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"

// Dados dos veículos por categoria
const vehicleCategories = [
  {
    id: "hatch",
    name: "Hatchbacks",
    description: "Compactos, econômicos e ideais para o trânsito urbano",
    vehicles: [
      {
        name: "Volkswagen Polo",
        year: "2025",
        image: "/images/cars/polo.png",
        available: true,
        price: "R$ 1.700/mês",
        features: ["Central Multimídia VW Play", "Ar-condicionado", "Direção elétrica"],
      },
      {
        name: "Volkswagen Gol",
        year: "2022",
        image: "/images/cars/gol.png",
        available: true,
        price: "R$ 1.550/mês",
        features: ["Baixo consumo", "Manutenção simples", "Confiabilidade"],
      },
      {
        name: "Citroën C3",
        year: "2025",
        image: "/images/cars/c3.png",
        available: true,
        price: "R$ 1.750/mês",
        features: ["Câmera de ré", "Sensor de estacionamento", "Bluetooth"],
      },
    ],
  },
  {
    id: "sedan",
    name: "Sedans",
    description: "Mais espaço e conforto para você e seus passageiros",
    vehicles: [
      {
        name: "Toyota Corolla",
        year: "2023",
        image: "/images/cars/corolla.png",
        available: true,
        price: "R$ 2.200/mês",
        features: ["Multimídia 9''", "Bancos em couro", "Câmera 360°"],
      },
      {
        name: "Volkswagen Virtus",
        year: "2023",
        image: "/images/cars/virtus.png",
        available: true,
        price: "R$ 1.900/mês",
        features: ["Central VW Play", "Ar-condicionado digital", "Keyless"],
      },
      {
        name: "Nissan Versa",
        year: "2024",
        image: "/images/cars/versa.png",
        available: true,
        price: "R$ 2.000/mês",
        features: ["Multimídia 8''", "Câmera de ré", "Ar-condicionado automático"],
      },
      {
        name: "Chevrolet Onix Plus",
        year: "2024",
        image: "/images/cars/onix-plus.png",
        available: true,
        price: "R$ 1.850/mês",
        features: ["MyLink 8''", "Wi-Fi nativo", "6 airbags"],
      },
      {
        name: "Chevrolet Onix Plus Turbo",
        year: "2021",
        image: "/images/cars/onix-plus.png",
        available: true,
        price: "R$ 1.850/mês",
        features: ["MyLink 8''", "Wi-Fi nativo", "6 airbags"],
      },
      {
        name: "Fiat Cronos",
        year: "2022",
        image: "/images/cars/cronos.png",
        available: true,
        price: "R$ 1.850/mês",
        features: ["Central multimídia", "Direção elétrica", "Vidros elétricos"],
      },
      {
        name: "Renault Logan",
        year: "2021",
        image: "/images/cars/logan.png",
        available: true,
        price: "R$ 1.600/mês",
        features: ["Amplo porta-malas", "Baixo custo de manutenção", "Econômico"],
      },
    ],
  },
  {
    id: "hibridos",
    name: "Híbridos",
    description: "Economia de combustível e sustentabilidade para seu negócio",
    vehicles: [
      {
        name: "Toyota Prius",
        year: "2023",
        image: "/images/cars/prius.png",
        available: true,
        price: "R$ 2.900/mês",
        features: ["Consumo de até 30km/l", "Tecnologia híbrida avançada", "Painel digital"],
        badge: "HÍBRIDO",
      },
      {
        name: "Toyota Corolla Híbrido",
        year: "2023",
        image: "/images/cars/corolla.png",
        available: true,
        price: "R$ 2.700/mês",
        features: ["Consumo de até 22km/l", "Bancos em couro", "Multimídia 10''"],
        badge: "HÍBRIDO",
      },
      {
        name: "Toyota Corolla Cross Híbrido",
        year: "2023",
        image: "/images/cars/corolla-cross.png",
        available: true,
        price: "R$ 2.900/mês",
        features: ["SUV espaçoso", "Consumo de até 18km/l", "Câmera 360°"],
        badge: "HÍBRIDO",
      },
      {
        name: "Hyundai Ioniq",
        year: "2022",
        image: "/images/cars/ioniq.png",
        available: true,
        price: "R$ 2.800/mês",
        features: ["Consumo de até 25km/l", "Carregamento rápido", "Painel digital"],
        badge: "HÍBRIDO",
      },
    ],
  },
  {
    id: "minivans",
    name: "Minivans",
    description: "Ideal para grupos e famílias com mais espaço para bagagem",
    vehicles: [
      {
        name: "Chevrolet Spin",
        year: "2023",
        image: "/images/cars/spin-big.png",
        available: true,
        price: "R$ 2.300/mês",
        features: ["7 lugares", "Porta-malas espaçoso", "Ideal para aeroporto"],
      },
      {
        name: "Chevrolet Spin D-TAXI",
        year: "2023",
        image: "/images/cars/dtaxi-spin.png",
        available: true,
        price: "R$ 2.400/mês",
        features: ["Acesso ao Aeroporto", "7 lugares", "Corridas exclusivas"],
        badge: "D-TAXI",
      },
      {
        name: "Citroën C3 Aircross",
        year: "2025",
        image: "/images/cars/c3-aircross.png",
        available: true,
        price: "R$ 2.600/mês",
        features: ["7 lugares", "Central multimídia 10''", "Câmera de ré"],
      },
    ],
  },
  {
    id: "acessiveis",
    name: "Acessíveis",
    description: "Opções econômicas para iniciar sua carreira como taxista",
    vehicles: [
      {
        name: "Chevrolet Spin",
        year: "2023",
        image: "/images/cars/spin-big.png",
        available: true,
        price: "R$ 2.300/mês",
        features: ["7 lugares", "Porta-malas espaçoso", "Ideal para aeroporto"],
      },
    ],
  },
  {
    id: "dtaxi",
    name: "D-TAXI",
    description: "Veículos exclusivos para operação no Aeroporto de Congonhas",
    vehicles: [
      {
        name: "Chevrolet Spin D-TAXI",
        year: "2023",
        image: "/images/cars/dtaxi-spin.png",
        available: true,
        price: "R$ 2.300/mês",
        features: ["Acesso ao Aeroporto", "7 lugares", "Corridas exclusivas"],
        badge: "D-TAXI",
        highlight: true,
      },
      {
        name: "Toyota Corolla D-TAXI",
        year: "2023",
        image: "/images/cars/corolla.png",
        available: true,
        price: "R$ 2.400/mês",
        features: ["Acesso ao Aeroporto", "Conforto premium", "Corridas exclusivas"],
        badge: "D-TAXI",
      },
      {
        name: "Toyota Prius D-TAXI",
        year: "2023",
        image: "/images/cars/prius.png",
        available: true,
        price: "R$ 2.800/mês",
        features: ["Acesso ao Aeroporto", "Economia de combustível", "Corridas exclusivas"],
        badge: "D-TAXI",
      },
      {
        name: "Toyota Corolla Cross D-TAXI",
        year: "2023",
        image: "/images/cars/corolla-cross.png",
        available: true,
        price: "R$ 2.600/mês",
        features: ["Acesso ao Aeroporto", "SUV espaçoso", "Corridas exclusivas"],
        badge: "D-TAXI",
      },
    ],
  },
]

export default function VehicleCategoryCarousel() {
  const [activeCategory, setActiveCategory] = useState("hatch")

  const activeVehicles = vehicleCategories.find((cat) => cat.id === activeCategory)?.vehicles || []

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-4">
        {vehicleCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className={`min-w-[120px] ${
              category.id === "dtaxi" ? "bg-green-600 hover:bg-green-700 text-white" : ""
            } ${activeCategory === category.id && category.id === "dtaxi" ? "bg-green-700" : ""}`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {vehicleCategories
          .filter((category) => category.id === activeCategory)
          .map((category) => (
            <div key={category.id} className="text-center">
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}

        <Carousel
          opts={{
            align: "start",
            loop: activeVehicles.length > 3,
          }}
          className="w-full"
        >
          <CarouselContent>
            {activeVehicles.map((vehicle, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex flex-col rounded-xl border overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full ${
                    vehicle.highlight ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full bg-white">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                    />
                    {vehicle.available ? (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Disponível
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Indisponível
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-md font-semibold">
                      {vehicle.price}
                    </div>
                    {vehicle.badge && (
                      <div className="absolute top-2 left-2">
                        <Badge className={`${vehicle.badge === "HÍBRIDO" ? "bg-blue-600" : "bg-green-600"} text-white`}>
                          {vehicle.badge}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold">{vehicle.name}</h3>
                    <p className="text-gray-700">Ano: {vehicle.year}</p>

                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Características:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {vehicle.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4">
                      <Link href="/cadastro">
                        <Button
                          variant={vehicle.available ? "default" : "outline"}
                          className={`w-full ${vehicle.badge === "D-TAXI" ? "bg-green-600 hover:bg-green-700" : vehicle.badge === "HÍBRIDO" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          disabled={!vehicle.available}
                        >
                          {vehicle.available ? "Solicitar Veículo" : "Indisponível"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
