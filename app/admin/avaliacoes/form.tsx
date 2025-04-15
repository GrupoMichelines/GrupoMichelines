"use client"

import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Driver } from "@/app/types"

interface EvaluationFormProps {
  drivers: Driver[]
  onSuccess: () => void
}

export function EvaluationForm({ drivers, onSuccess }: EvaluationFormProps) {
  const [formData, setFormData] = useState({
    driverId: "",
    rating: 5,
    comment: "",
    strengths: "",
    weaknesses: "",
    recommendations: "",
    vehicleType: "",
    rentalPeriod: "",
    evaluatorName: "",
    evaluatorRole: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const selectedDriver = drivers.find(d => d.id === formData.driverId)
      if (!selectedDriver) throw new Error("Motorista não encontrado")

      const evaluationData = {
        driverId: formData.driverId,
        driverName: `${selectedDriver.firstName} ${selectedDriver.lastName}`,
        rating: formData.rating,
        comment: formData.comment,
        status: "pending",
        createdAt: serverTimestamp(),
        evaluatorName: formData.evaluatorName,
        evaluatorRole: formData.evaluatorRole,
        vehicleType: formData.vehicleType,
        rentalPeriod: formData.rentalPeriod,
        strengths: formData.strengths.split(",").map(s => s.trim()).filter(Boolean),
        weaknesses: formData.weaknesses.split(",").map(w => w.trim()).filter(Boolean),
        recommendations: formData.recommendations
      }

      await addDoc(collection(db, "evaluations"), evaluationData)
      onSuccess()
    } catch (error) {
      console.error("Error submitting evaluation:", error)
      setError("Ocorreu um erro ao registrar a avaliação. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="driverId">Motorista</Label>
        <Select
          value={formData.driverId}
          onValueChange={(value) => setFormData(prev => ({ ...prev, driverId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o motorista" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map(driver => (
              <SelectItem key={driver.id} value={driver.id}>
                {`${driver.firstName} ${driver.lastName}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Nota</Label>
        <Select
          value={formData.rating.toString()}
          onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a nota" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(rating => (
              <SelectItem key={rating} value={rating.toString()}>
                {rating} estrelas
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comentário</Label>
        <Textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
          placeholder="Digite seu comentário sobre o motorista"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="strengths">Pontos Fortes</Label>
        <Input
          id="strengths"
          value={formData.strengths}
          onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
          placeholder="Digite os pontos fortes separados por vírgula"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weaknesses">Pontos a Melhorar</Label>
        <Input
          id="weaknesses"
          value={formData.weaknesses}
          onChange={(e) => setFormData(prev => ({ ...prev, weaknesses: e.target.value }))}
          placeholder="Digite os pontos a melhorar separados por vírgula"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recommendations">Recomendações</Label>
        <Textarea
          id="recommendations"
          value={formData.recommendations}
          onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
          placeholder="Digite suas recomendações"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Tipo de Veículo</Label>
          <Input
            id="vehicleType"
            value={formData.vehicleType}
            onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))}
            placeholder="Ex: Sedan, SUV, etc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rentalPeriod">Período de Locação</Label>
          <Input
            id="rentalPeriod"
            value={formData.rentalPeriod}
            onChange={(e) => setFormData(prev => ({ ...prev, rentalPeriod: e.target.value }))}
            placeholder="Ex: 1 mês, 3 meses, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="evaluatorName">Nome do Avaliador</Label>
          <Input
            id="evaluatorName"
            value={formData.evaluatorName}
            onChange={(e) => setFormData(prev => ({ ...prev, evaluatorName: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="evaluatorRole">Cargo do Avaliador</Label>
          <Input
            id="evaluatorRole"
            value={formData.evaluatorRole}
            onChange={(e) => setFormData(prev => ({ ...prev, evaluatorRole: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onSuccess()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar Avaliação"}
        </Button>
      </div>
    </form>
  )
} 