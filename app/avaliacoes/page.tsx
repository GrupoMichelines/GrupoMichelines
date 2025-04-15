"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Star } from "lucide-react"

export default function AvaliacoesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState<string>("5")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Avaliação enviada com sucesso!",
      description: "Sua avaliação será analisada e publicada em breve. Agradecemos seu feedback!",
    })

    setIsSubmitting(false)
    // Reset form
    event.currentTarget.reset()
    setRating("5")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Avalie Nossos Serviços</h1>
          <p className="text-gray-600">
            Sua opinião é muito importante para nós. Compartilhe sua experiência com a Michelines e ajude-nos a melhorar
            nossos serviços.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input id="nome" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" />
              </div>

              <div className="space-y-2">
                <Label>Avaliação *</Label>
                <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-2 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                      <Label htmlFor={`rating-${value}`} className="cursor-pointer">
                        <Star
                          className={`h-8 w-8 ${Number.parseInt(rating) >= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      </Label>
                      <span className="text-xs mt-1">{value}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Avaliação *</Label>
                <Input id="titulo" placeholder="Ex: Excelente serviço!" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentario">Seu Comentário *</Label>
                <Textarea
                  id="comentario"
                  rows={5}
                  placeholder="Conte-nos sobre sua experiência com a Michelines..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempo">Há quanto tempo você é cliente da Michelines?</Label>
                <Input id="tempo" placeholder="Ex: 2 anos" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Campos marcados com * são obrigatórios.</p>
          <p className="mt-2">
            Sua avaliação será analisada por nossa equipe antes de ser publicada no site. Agradecemos sua compreensão e
            colaboração.
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

