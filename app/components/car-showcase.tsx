"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, ChevronLeft, ChevronRight } from "lucide-react"

const cars = [
  {
    id: 1,
    name: "Toyota Corolla",
    type: "Sedan",
    year: "2023",
    image: "/images/cars/corolla.jpg",
    description: "Carro econômico e confiável, perfeito para trabalho.",
    features: ["Ar condicionado", "Direção hidráulica", "Airbag", "ABS"]
  },
  {
    id: 2,
    name: "Honda Civic",
    type: "Sedan",
    year: "2023",
    image: "/images/cars/civic.jpg",
    description: "Conforto e tecnologia em um só carro.",
    features: ["Ar condicionado", "Direção elétrica", "Airbag", "ABS", "Sensor de ré"]
  },
  {
    id: 3,
    name: "Hyundai HB20",
    type: "Hatch",
    year: "2023",
    image: "/images/cars/hb20.jpg",
    description: "Compacto e versátil, ideal para a cidade.",
    features: ["Ar condicionado", "Direção hidráulica", "Airbag", "ABS"]
  }
]

export function CarShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length)
  }

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length)
  }

  const currentCar = cars[currentIndex]

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{currentCar.name}</span>
            <span className="text-sm text-gray-500">{currentCar.year}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video relative bg-gray-100 rounded-lg mb-4">
            <Car className="w-full h-full text-gray-300" />
          </div>
          <p className="text-sm text-gray-600 mb-4">{currentCar.description}</p>
          <div className="space-y-2">
            <h4 className="font-medium">Características:</h4>
            <ul className="grid grid-cols-2 gap-2">
              {currentCar.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevCar}
          className="bg-white/80 hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextCar}
          className="bg-white/80 hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 