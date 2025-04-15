"use client"

import { EvaluationForm } from "../components/evaluation/evaluation-form"

export default function EvaluationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Avalie Nossos Serviços</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <EvaluationForm />
        </div>
      </div>
    </div>
  )
} 