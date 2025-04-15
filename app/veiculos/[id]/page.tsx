import { getVeiculoById } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Fuel, Calendar, Info, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface VeiculoPageProps {
  params: {
    id: string
  }
}

export default async function VeiculoPage({ params }: VeiculoPageProps) {
  const veiculo = await getVeiculoById(params.id)

  if (!veiculo) {
    notFound()
  }

  return (
    <main className="py-12">
      <div className="container">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/veiculos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para veículos
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
              <Image
                src={veiculo.imagem_url || "/placeholder.svg?height=600&width=800&text=Veículo"}
                alt={`${veiculo.marca} ${veiculo.modelo}`}
                fill
                className="object-cover"
              />
              {veiculo.destaque && <Badge className="absolute top-4 right-4 bg-yellow-500">Destaque</Badge>}
              {veiculo.acessivel && <Badge className="absolute top-4 left-4 bg-blue-500">Acessível</Badge>}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {veiculo.marca} {veiculo.modelo}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {veiculo.categoria} • {veiculo.ano} • {veiculo.combustivel}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{veiculo.categoria}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Ano {veiculo.ano}</span>
              </div>
              <div className="flex items-center">
                <Fuel className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{veiculo.combustivel}</span>
              </div>
              <div className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{veiculo.disponivel ? "Disponível" : "Indisponível"}</span>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Valores</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-muted-foreground">Diária</p>
                    <p className="text-2xl font-bold">R$ {veiculo.valor_diaria.toFixed(2)}</p>
                  </div>
                  {veiculo.valor_semanal && (
                    <div>
                      <p className="text-muted-foreground">Semanal</p>
                      <p className="text-2xl font-bold">R$ {veiculo.valor_semanal.toFixed(2)}</p>
                    </div>
                  )}
                  {veiculo.valor_mensal && (
                    <div>
                      <p className="text-muted-foreground">Mensal</p>
                      <p className="text-2xl font-bold">R$ {veiculo.valor_mensal.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="caracteristicas">
              <TabsList className="mb-4">
                <TabsTrigger value="caracteristicas">Características</TabsTrigger>
                <TabsTrigger value="condicoes">Condições</TabsTrigger>
              </TabsList>
              <TabsContent value="caracteristicas">
                <div className="grid grid-cols-2 gap-2">
                  {veiculo.caracteristicas && veiculo.caracteristicas.length > 0 ? (
                    veiculo.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span>{caracteristica}</span>
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma característica especificada.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="condicoes">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Necessário CNH categoria B ou superior</li>
                  <li>Necessário CONDUTAX válido</li>
                  <li>Idade mínima: 21 anos</li>
                  <li>Experiência mínima de 2 anos como motorista</li>
                  <li>Seguro incluso</li>
                  <li>Manutenção preventiva inclusa</li>
                </ul>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button asChild size="lg" className="w-full">
                <Link href="/cadastro?veiculo=${veiculo.id}">Solicitar este veículo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

