import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Tag } from "lucide-react"

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Como se tornar um taxista de sucesso em São Paulo",
    excerpt:
      "Descubra os passos essenciais para iniciar sua carreira como taxista na maior cidade do Brasil e garantir um bom rendimento mensal.",
    image: "/placeholder.svg?height=200&width=400",
    date: "15/03/2023",
    readTime: "8 min",
    author: "Carlos Oliveira",
    category: "Carreira",
    slug: "como-se-tornar-taxista-sucesso",
  },
  {
    id: 2,
    title: "Dicas para economizar combustível no dia a dia",
    excerpt:
      "Aprenda técnicas de direção econômica e hábitos que podem reduzir significativamente o consumo de combustível do seu táxi.",
    image: "/placeholder.svg?height=200&width=400",
    date: "02/04/2023",
    readTime: "6 min",
    author: "Ana Silva",
    category: "Economia",
    slug: "dicas-economizar-combustivel",
  },
  {
    id: 3,
    title: "Os melhores aplicativos para taxistas em 2023",
    excerpt:
      "Conheça as ferramentas digitais que podem ajudar a otimizar seu trabalho, encontrar mais passageiros e gerenciar suas finanças.",
    image: "/placeholder.svg?height=200&width=400",
    date: "20/04/2023",
    readTime: "5 min",
    author: "Roberto Santos",
    category: "Tecnologia",
    slug: "melhores-aplicativos-taxistas",
  },
  {
    id: 4,
    title: "Segurança no táxi: como proteger você e seus passageiros",
    excerpt:
      "Medidas de segurança essenciais para garantir tranquilidade durante o trabalho e oferecer um serviço de qualidade aos clientes.",
    image: "/placeholder.svg?height=200&width=400",
    date: "05/05/2023",
    readTime: "7 min",
    author: "Juliana Costa",
    category: "Segurança",
    slug: "seguranca-taxi-proteger-passageiros",
  },
  {
    id: 5,
    title: "Manutenção preventiva: prolongue a vida útil do seu táxi",
    excerpt:
      "Guia completo sobre os cuidados essenciais com seu veículo para evitar problemas mecânicos e reduzir custos com reparos.",
    image: "/placeholder.svg?height=200&width=400",
    date: "18/05/2023",
    readTime: "9 min",
    author: "Fernando Almeida",
    category: "Manutenção",
    slug: "manutencao-preventiva-taxi",
  },
  {
    id: 6,
    title: "Como lidar com passageiros difíceis: guia prático",
    excerpt:
      "Estratégias e técnicas de comunicação para gerenciar situações desafiadoras com clientes e garantir um bom atendimento.",
    image: "/placeholder.svg?height=200&width=400",
    date: "01/06/2023",
    readTime: "6 min",
    author: "Mariana Lima",
    category: "Atendimento",
    slug: "lidar-passageiros-dificeis",
  },
]

// Mock data for categories
const categories = [
  { name: "Carreira", count: 8 },
  { name: "Economia", count: 12 },
  { name: "Tecnologia", count: 7 },
  { name: "Segurança", count: 5 },
  { name: "Manutenção", count: 9 },
  { name: "Atendimento", count: 6 },
  { name: "Legislação", count: 4 },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Blog da Michelines</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Dicas, informações e conteúdos úteis para taxistas. Aprenda como melhorar seu desempenho, economizar e
            oferecer um serviço de qualidade aos seus passageiros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{post.category}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="text-xl">
                          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            Ler mais
                          </Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">Carregar mais artigos</Button>
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/blog/categoria/${category.name.toLowerCase()}`}
                        className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-blue-600" />
                          {category.name}
                        </div>
                        <Badge variant="outline">{category.count}</Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Newsletter</CardTitle>
                  <CardDescription>Receba nossas dicas e novidades diretamente no seu e-mail</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <input type="email" placeholder="Seu e-mail" className="w-full p-2 border rounded-md" required />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Inscrever-se</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

