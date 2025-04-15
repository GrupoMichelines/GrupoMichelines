import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, Award, Car } from "lucide-react"

export const metadata = {
  title: "Sobre Nós | Michelines Táxi",
  description: "Conheça a história e os valores da Michelines Táxi.",
}

export default function SobrePage() {
  return (
    <main className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Sobre a Michelines Táxi</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Há mais de 15 anos oferecendo os melhores veículos e condições para taxistas em São Paulo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=1200&text=Michelines+Táxi"
              alt="Michelines Táxi"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
            <p className="mb-4">
              Fundada em 2008, a Michelines Táxi nasceu com o objetivo de oferecer veículos de qualidade para taxistas
              em São Paulo. O que começou como uma pequena empresa familiar com apenas 5 veículos, hoje se tornou uma
              das maiores empresas de locação de táxis da cidade.
            </p>
            <p className="mb-4">
              Ao longo desses anos, mantivemos nosso compromisso com a qualidade e o atendimento personalizado,
              entendendo as necessidades específicas dos taxistas e oferecendo soluções que realmente fazem a diferença
              no dia a dia.
            </p>
            <p className="mb-6">
              Hoje, contamos com uma frota de mais de 200 veículos e atendemos centenas de taxistas em toda a região
              metropolitana de São Paulo, sempre com o mesmo cuidado e atenção que nos trouxe até aqui.
            </p>
            <Button asChild>
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>15+ Anos</CardTitle>
              <CardDescription>De experiência no mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Mais de uma década e meia de experiência no setor de táxis em São Paulo.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Car className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>200+ Veículos</CardTitle>
              <CardDescription>Frota diversificada e moderna</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Uma ampla variedade de veículos para atender diferentes necessidades e preferências.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>500+ Clientes</CardTitle>
              <CardDescription>Taxistas satisfeitos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Centenas de taxistas confiam na Michelines para seu veículo de trabalho.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Award className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>Reconhecimento</CardTitle>
              <CardDescription>Qualidade premiada</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reconhecida como uma das melhores empresas de locação de táxis de São Paulo.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Princípios que guiam nossas ações e decisões todos os dias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Compromisso com a Qualidade</h3>
              <p>
                Oferecemos apenas veículos de qualidade, bem mantidos e seguros, para que nossos clientes possam
                trabalhar com tranquilidade.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Atendimento Personalizado</h3>
              <p>
                Entendemos que cada taxista tem necessidades específicas, por isso oferecemos um atendimento
                personalizado e soluções sob medida.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Transparência</h3>
              <p>
                Acreditamos que a transparência é fundamental para construir relacionamentos duradouros com nossos
                clientes.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Pronto para fazer parte da nossa história?</h2>
          <Button asChild size="lg">
            <Link href="/cadastro">Solicite seu táxi</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

