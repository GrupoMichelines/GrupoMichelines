import { CarShowcase } from "../components/car-showcase"
import { getVeiculosDisponiveis } from "@/lib/api"

export const metadata = {
  title: "Veículos | Michelines Táxi",
  description: "Conheça nossa frota de veículos disponíveis para locação para taxistas.",
}

export default async function VeiculosPage() {
  const veiculos = await getVeiculosDisponiveis()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nossa Frota</h1>
      <div className="max-w-3xl mx-auto">
        <CarShowcase />
      </div>
    </div>
  )
}

