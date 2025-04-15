import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react"

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "Como se tornar um taxista de sucesso em São Paulo",
  content: `
    <p>Trabalhar como taxista em São Paulo pode ser uma carreira gratificante e lucrativa, mas requer preparação e conhecimento. Neste artigo, vamos explorar os passos essenciais para se tornar um taxista de sucesso na maior cidade do Brasil.</p>
    
    <h2>Requisitos legais para ser taxista</h2>
    
    <p>O primeiro passo para se tornar um taxista em São Paulo é atender aos requisitos legais estabelecidos pelo Departamento de Transportes Públicos (DTP). Entre os principais requisitos estão:</p>
    
    <ul>
      <li>Possuir Carteira Nacional de Habilitação (CNH) categoria B ou superior, com observação de atividade remunerada</li>
      <li>Obter o Condutax (Cadastro Municipal de Condutores de Táxi)</li>
      <li>Realizar curso de formação específico para taxistas</li>
      <li>Não ter antecedentes criminais</li>
      <li>Estar em dia com obrigações eleitorais e militares</li>
    </ul>
    
    <h2>Opções para iniciar na profissão</h2>
    
    <p>Existem basicamente três caminhos para iniciar na profissão de taxista em São Paulo:</p>
    
    <ol>
      <li><strong>Adquirir um alvará próprio:</strong> Esta é a opção mais cara, pois envolve a compra de um alvará (licença) que pode custar valores significativos.</li>
      <li><strong>Trabalhar como segundo motorista:</strong> Você pode trabalhar com o táxi de outro proprietário, dividindo os lucros ou pagando uma diária fixa.</li>
      <li><strong>Alugar um táxi de uma locadora especializada:</strong> Esta opção tem se tornado cada vez mais popular, pois elimina a necessidade de investimento inicial alto e oferece suporte administrativo.</li>
    </ol>
    
    <h2>Vantagens de alugar um táxi</h2>
    
    <p>Alugar um táxi de uma locadora especializada como a Michelines oferece diversas vantagens:</p>
    
    <ul>
      <li>Menor investimento inicial</li>
      <li>Veículos novos e bem mantidos</li>
      <li>Suporte administrativo e jurídico</li>
      <li>Manutenção preventiva e corretiva incluída</li>
      <li>Possibilidade de parcerias exclusivas (como acesso a pontos privilegiados)</li>
    </ul>
    
    <h2>Dicas para o sucesso na profissão</h2>
    
    <p>Além de cumprir os requisitos legais e escolher a melhor forma de iniciar, existem algumas práticas que podem ajudar você a ter sucesso como taxista:</p>
    
    <ul>
      <li><strong>Conheça bem a cidade:</strong> Familiarize-se com ruas, avenidas, pontos turísticos e rotas alternativas para evitar congestionamentos.</li>
      <li><strong>Mantenha o veículo impecável:</strong> Um táxi limpo e bem conservado passa confiança aos passageiros e aumenta suas chances de receber boas avaliações.</li>
      <li><strong>Ofereça um atendimento de qualidade:</strong> Seja educado, prestativo e profissional com todos os passageiros.</li>
      <li><strong>Utilize aplicativos de táxi:</strong> Cadastre-se em aplicativos de táxi para aumentar suas chances de conseguir corridas.</li>
      <li><strong>Gerencie bem suas finanças:</strong> Controle seus gastos e receitas para garantir que a atividade seja lucrativa.</li>
    </ul>
    
    <h2>Conclusão</h2>
    
    <p>Tornar-se um taxista de sucesso em São Paulo requer dedicação, profissionalismo e planejamento. Ao seguir os passos legais, escolher a melhor forma de iniciar na profissão e adotar boas práticas de trabalho, você estará no caminho certo para construir uma carreira sólida e rentável como taxista.</p>
    
    <p>A Michelines está à disposição para ajudar você a iniciar ou aprimorar sua carreira como taxista, oferecendo as melhores condições de locação e suporte completo para o seu sucesso profissional.</p>
  `,
  image: "/placeholder.svg?height=400&width=800",
  date: "15/03/2023",
  readTime: "8 min",
  author: "Carlos Oliveira",
  category: "Carreira",
  slug: "como-se-tornar-taxista-sucesso",
  relatedPosts: [
    {
      id: 2,
      title: "Dicas para economizar combustível no dia a dia",
      excerpt:
        "Aprenda técnicas de direção econômica e hábitos que podem reduzir significativamente o consumo de combustível do seu táxi.",
      image: "/placeholder.svg?height=100&width=200",
      slug: "dicas-economizar-combustivel",
    },
    {
      id: 3,
      title: "Os melhores aplicativos para taxistas em 2023",
      excerpt:
        "Conheça as ferramentas digitais que podem ajudar a otimizar seu trabalho, encontrar mais passageiros e gerenciar suas finanças.",
      image: "/placeholder.svg?height=100&width=200",
      slug: "melhores-aplicativos-taxistas",
    },
    {
      id: 5,
      title: "Manutenção preventiva: prolongue a vida útil do seu táxi",
      excerpt:
        "Guia completo sobre os cuidados essenciais com seu veículo para evitar problemas mecânicos e reduzir custos com reparos.",
      image: "/placeholder.svg?height=100&width=200",
      slug: "manutencao-preventiva-taxi",
    },
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the blog post based on the slug
  // For this example, we're using mock data

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{blogPost.category}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {blogPost.date}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {blogPost.readTime}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{blogPost.title}</h1>

          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
            <div>
              <div className="font-medium">Por {blogPost.author}</div>
              <div className="text-sm text-gray-500">Especialista em mobilidade urbana</div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={blogPost.image || "/placeholder.svg"}
            alt={blogPost.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>

        <div className="border-t border-b py-6 my-8">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Compartilhe este artigo:</div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Compartilhar no Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Compartilhar no Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Compartilhar no LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Artigos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPost.relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="border rounded-lg overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

