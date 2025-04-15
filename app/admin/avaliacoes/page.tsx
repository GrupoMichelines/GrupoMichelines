"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/app/lib/firebase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Evaluation {
  id: string
  name: string
  email: string
  rating: number
  comment: string
  status: string
  createdAt: string
}

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvaluations() {
      try {
        const q = query(collection(db, "evaluations"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        const evaluationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Evaluation[]
        setEvaluations(evaluationsData)
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvaluations()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Carregando avaliações...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Avaliações dos Clientes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {evaluations.map((evaluation) => (
          <Card key={evaluation.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{evaluation.name}</span>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{evaluation.rating}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{evaluation.email}</p>
              <p className="text-sm">{evaluation.comment}</p>
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {new Date(evaluation.createdAt).toLocaleDateString()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  evaluation.status === "em_analise" 
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {evaluation.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 