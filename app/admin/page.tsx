"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, limit, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Driver, Evaluation, RentalRequest } from "@/app/types"
import { Star, Car, CheckCircle2, XCircle, Trash2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [driversSnapshot, evaluationsSnapshot, rentalRequestsSnapshot] = await Promise.all([
        getDocs(query(collection(db, "drivers"), orderBy("createdAt", "desc"), limit(5))),
        getDocs(query(collection(db, "evaluations"), orderBy("createdAt", "desc"), limit(5))),
        getDocs(query(collection(db, "rentalRequests"), orderBy("createdAt", "desc"), limit(5)))
      ])

      const driversData = driversSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Driver[]

      const evaluationsData = evaluationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Evaluation[]

      const rentalRequestsData = rentalRequestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RentalRequest[]

      setDrivers(driversData)
      setEvaluations(evaluationsData)
      setRentalRequests(rentalRequestsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateDriverStatus = async (driverId: string, status: "active" | "pending" | "inactive") => {
    try {
      await updateDoc(doc(db, "drivers", driverId), { status })
      setDrivers(prev => prev.map(driver => 
        driver.id === driverId ? { ...driver, status } : driver
      ))
    } catch (error) {
      console.error("Error updating driver status:", error)
    }
  }

  const handleUpdateEvaluationStatus = async (evaluationId: string, status: "published" | "archived") => {
    try {
      await updateDoc(doc(db, "evaluations", evaluationId), { status })
      setEvaluations(prev => prev.map(evaluation => 
        evaluation.id === evaluationId ? { ...evaluation, status } : evaluation
      ))
    } catch (error) {
      console.error("Error updating evaluation status:", error)
    }
  }

  const handleUpdateRentalStatus = async (requestId: string, status: "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "rentalRequests", requestId), { status })
      setRentalRequests(prev => prev.map(request => 
        request.id === requestId ? { ...request, status } : request
      ))
    } catch (error) {
      console.error("Error updating rental request status:", error)
    }
  }

  const handleDeleteDriver = async (driverId: string) => {
    if (!confirm("Tem certeza que deseja excluir este motorista?")) return

    try {
      await deleteDoc(doc(db, "drivers", driverId))
      setDrivers(prev => prev.filter(driver => driver.id !== driverId))
    } catch (error) {
      console.error("Error deleting driver:", error)
    }
  }

  const handleDeleteEvaluation = async (evaluationId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta avaliação?")) return

    try {
      await deleteDoc(doc(db, "evaluations", evaluationId))
      setEvaluations(prev => prev.filter(evaluation => evaluation.id !== evaluationId))
    } catch (error) {
      console.error("Error deleting evaluation:", error)
    }
  }

  const handleDeleteRentalRequest = async (requestId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta solicitação?")) return

    try {
      await deleteDoc(doc(db, "rentalRequests", requestId))
      setRentalRequests(prev => prev.filter(request => request.id !== requestId))
    } catch (error) {
      console.error("Error deleting rental request:", error)
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <div className="flex gap-2">
          <Link href="/admin/motoristas">
            <Button variant="outline">Gerenciar Motoristas</Button>
          </Link>
          <Link href="/admin/avaliacoes">
            <Button variant="outline">Gerenciar Avaliações</Button>
          </Link>
          <Link href="/admin/solicitacoes">
            <Button variant="outline">Gerenciar Solicitações</Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="drivers">Motoristas</TabsTrigger>
          <TabsTrigger value="evaluations">Avaliações</TabsTrigger>
          <TabsTrigger value="rentals">Solicitações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Motoristas Pendentes</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {drivers.filter(d => d.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  de {drivers.length} motoristas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Motoristas Ativos</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {drivers.filter(d => d.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  de {drivers.length} motoristas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avaliações Publicadas</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {evaluations.filter(e => e.status === "published").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  de {evaluations.length} avaliações
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {evaluations.filter(e => e.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  aguardando aprovação
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Últimos Motoristas</CardTitle>
                <CardDescription>
                  Motoristas cadastrados recentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drivers.map(driver => (
                    <div key={driver.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{driver.firstName} {driver.lastName}</p>
                        <p className="text-sm text-muted-foreground">{driver.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {driver.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateDriverStatus(driver.id, "active")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Aprovar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateDriverStatus(driver.id, "inactive")}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Rejeitar
                            </Button>
                          </>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteDriver(driver.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Avaliações</CardTitle>
                <CardDescription>
                  Avaliações recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluations.map(evaluation => (
                    <div key={evaluation.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{evaluation.driverName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: evaluation.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {evaluation.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateEvaluationStatus(evaluation.id, "published")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Publicar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateEvaluationStatus(evaluation.id, "archived")}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Arquivar
                            </Button>
                          </>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteEvaluation(evaluation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Motoristas Recentes</CardTitle>
              <CardDescription>
                Lista dos últimos motoristas cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drivers.map(driver => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{driver.firstName} {driver.lastName}</p>
                      <p className="text-sm text-muted-foreground">{driver.email} • {driver.phone}</p>
                      <p className="text-sm text-muted-foreground">CPF: {driver.cpf}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {driver.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateDriverStatus(driver.id, "active")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateDriverStatus(driver.id, "inactive")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeitar
                          </Button>
                        </>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDriver(driver.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações Recentes</CardTitle>
              <CardDescription>
                Lista das últimas avaliações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluations.map(evaluation => (
                  <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{evaluation.driverName}</p>
                      <p className="text-sm text-muted-foreground">
                        Avaliado por {evaluation.evaluatorName} ({evaluation.evaluatorRole})
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: evaluation.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {evaluation.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateEvaluationStatus(evaluation.id, "published")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Publicar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateEvaluationStatus(evaluation.id, "archived")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Arquivar
                          </Button>
                        </>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvaluation(evaluation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações Recentes</CardTitle>
              <CardDescription>
                Lista das últimas solicitações de locação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rentalRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{request.driverName}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.vehicleType} • {request.startDate} a {request.endDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total: R$ {request.totalAmount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateRentalStatus(request.id, "approved")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateRentalStatus(request.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeitar
                          </Button>
                        </>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRentalRequest(request.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
