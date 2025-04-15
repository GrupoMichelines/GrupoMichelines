"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Search } from "lucide-react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase/config"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadastroPage() {
  const [step, setStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    hasRentalExperience: "",
    rentalExperienceType: [] as string[],
    rentalExperienceDetails: "",
    rentalExperienceTime: "",
    hasRentalProblems: "",
    rentalProblemsDetails: "",
    hasRentalDebt: "",
    rentalDebtValue: "",
    rentalDebtReason: "",
    reference1Name: "",
    reference1Relationship: "",
    reference1Phone: "",
    reference2Name: "",
    reference2Relationship: "",
    reference2Phone: "",
  })

  const [files, setFiles] = useState({
    cnh: null,
    crlv: null,
    profilePhoto: null,
    carPhoto: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [fileUrls, setFileUrls] = useState<Record<string, string>>({})

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepError, setCepError] = useState("")

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "Nome é obrigatório"
      if (!formData.lastName) newErrors.lastName = "Sobrenome é obrigatório"
      if (!formData.email) newErrors.email = "Email é obrigatório"
      if (!formData.phone) newErrors.phone = "Telefone é obrigatório"
      if (!formData.cpf) newErrors.cpf = "CPF é obrigatório"
      if (!formData.cep) newErrors.cep = "CEP é obrigatório"
      if (!formData.street) newErrors.street = "Rua é obrigatória"
      if (!formData.number) newErrors.number = "Número é obrigatório"
      if (!formData.neighborhood) newErrors.neighborhood = "Bairro é obrigatório"
      if (!formData.city) newErrors.city = "Cidade é obrigatória"
      if (!formData.state) newErrors.state = "Estado é obrigatório"
    } else if (step === 2) {
      if (!formData.hasRentalExperience) newErrors.hasRentalExperience = "Esta informação é obrigatória"
      if (formData.hasRentalExperience === "sim" && formData.rentalExperienceType.length === 0) {
        newErrors.rentalExperienceType = "Selecione pelo menos uma opção"
      }
      if (formData.hasRentalExperience === "sim" && !formData.rentalExperienceTime) {
        newErrors.rentalExperienceTime = "Informe o tempo de experiência"
      }
      if (!formData.hasRentalProblems) newErrors.hasRentalProblems = "Esta informação é obrigatória"
      if (!formData.hasRentalDebt) newErrors.hasRentalDebt = "Esta informação é obrigatória"
      if (formData.hasRentalDebt === "sim" && !formData.rentalDebtValue) {
        newErrors.rentalDebtValue = "Informe o valor da dívida"
      }
      if (!formData.reference1Name || !formData.reference1Phone) {
        newErrors.reference1 = "Referência 1 é obrigatória"
      }
      if (!formData.reference2Name || !formData.reference2Phone) {
        newErrors.reference2 = "Referência 2 é obrigatória"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(step)) {
      return
    }

    if (step < 2) {
      setStep(step + 1)
    } else {
      try {
        setIsSubmitting(true)

        // Upload dos arquivos para o Firebase Storage
        const fileUrls: Record<string, string> = {}

        for (const [key, file] of Object.entries(files)) {
          if (file) {
            const storageRef = ref(storage, `drivers/${formData.cpf}/${key}_${Date.now()}`)
            await uploadBytes(storageRef, file)
            const downloadUrl = await getDownloadURL(storageRef)
            fileUrls[key] = downloadUrl
          }
        }

        // Salvar dados no Firestore
        const driverData = {
          ...formData,
          fullName: `${formData.firstName} ${formData.lastName}`,
          status: "pending",
          fileUrls,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }

        await addDoc(collection(db, "drivers"), driverData)

        setFormSubmitted(true)
      } catch (error) {
        console.error("Erro ao enviar formulário:", error)
        alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return value
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    let formattedValue = value

    if (id === 'phone') {
      formattedValue = formatPhone(value)
    } else if (id === 'cpf') {
      formattedValue = formatCPF(value)
    } else if (id === 'cep') {
      formattedValue = value.replace(/\D/g, '').slice(0, 8)
      setCepError("")
    }

    setFormData((prev) => ({
      ...prev,
      [id]: formattedValue,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target
    if (files && files.length > 0) {
      const file = files[0]
      const maxSize = id === 'profilePhoto' ? 2 * 1024 * 1024 : 5 * 1024 * 1024 // 2MB para foto de perfil, 5MB para outros
      
      if (file.size > maxSize) {
        alert(`O arquivo ${file.name} excede o tamanho máximo permitido de ${maxSize / (1024 * 1024)}MB`)
        return
      }

      setFiles((prev) => ({
        ...prev,
        [id]: file,
      }))
    }
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCepSearch = async (cep: string) => {
    if (cep.length !== 8) {
      setCepError("CEP deve ter 8 dígitos")
      return
    }

    setIsLoadingCep(true)
    setCepError("")
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      
      if (data.erro) {
        setCepError("CEP não encontrado")
        return
      }

      setFormData(prev => ({
        ...prev,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      }))
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
      setCepError("Erro ao buscar CEP. Tente novamente.")
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      rentalExperienceType: checked
        ? [...prev.rentalExperienceType, value]
        : prev.rentalExperienceType.filter(type => type !== value)
    }))
  }

  if (formSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b">
          <Link className="flex items-center justify-center" href="/">
            <Image
              src="/images/logos/logo-grupo-michelines.png"
              alt="Logo Grupo Michelines"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Cadastro Recebido!</CardTitle>
              <CardDescription>
                Obrigado por se cadastrar no Grupo Michelines. Analisaremos suas informações e entraremos em contato em
                breve.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href="/">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para a página inicial
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">© 2025 Grupo Michelines. Todos os direitos reservados.</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 sm:h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/images/logos/logo-grupo-michelines.png"
            alt="Logo Grupo Michelines"
            width={150}
            height={50}
            className="h-8 sm:h-10 w-auto"
          />
        </Link>
      </header>
      <main className="flex-1 py-6 sm:py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                Cadastro de Motorista
              </h1>
              <p className="max-w-[600px] text-sm sm:text-base md:text-lg text-gray-500">
                Preencha o formulário abaixo para se tornar um motorista do Grupo Michelines
              </p>
            </div>
          </div>
          <div className="mx-auto mt-6 sm:mt-8 max-w-2xl">
            <div className="flex justify-between mb-6 sm:mb-8">
              <div className={`flex flex-col items-center ${step >= 1 ? "text-yellow-500" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-sm sm:text-base ${
                    step >= 1 ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="text-xs sm:text-sm mt-1">Dados Pessoais</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 2 ? "text-yellow-500" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-sm sm:text-base ${
                    step >= 2 ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="text-xs sm:text-sm mt-1">Experiência</span>
              </div>
            </div>
            <Card className="w-full">
              <CardContent className="pt-4 sm:pt-6">
                <form onSubmit={handleNextStep}>
                  {step === 1 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm sm:text-base">Nome</Label>
                          <Input
                            id="firstName"
                            placeholder="Digite seu nome"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm sm:text-base">Sobrenome</Label>
                          <Input
                            id="lastName"
                            placeholder="Digite seu sobrenome"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                        <Input
                          id="email"
                          placeholder="Digite seu email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-xs sm:text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm sm:text-base">Telefone</Label>
                          <Input
                            id="phone"
                            placeholder="(00) 00000-0000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            maxLength={15}
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.phone}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cpf" className="text-sm sm:text-base">CPF</Label>
                          <Input
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                            maxLength={14}
                            className={errors.cpf ? "border-red-500" : ""}
                          />
                          {errors.cpf && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.cpf}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cep" className="text-sm sm:text-base">CEP</Label>
                        <div className="flex gap-2">
                          <Input
                            id="cep"
                            placeholder="00000000"
                            value={formData.cep}
                            onChange={handleInputChange}
                            required
                            maxLength={8}
                            className={errors.cep || cepError ? "border-red-500" : ""}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleCepSearch(formData.cep)}
                            disabled={isLoadingCep || formData.cep.length !== 8}
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                        {(errors.cep || cepError) && (
                          <p className="text-xs sm:text-sm text-red-500">{errors.cep || cepError}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="street" className="text-sm sm:text-base">Rua</Label>
                          <Input
                            id="street"
                            placeholder="Nome da rua"
                            value={formData.street}
                            onChange={handleInputChange}
                            required
                            className={errors.street ? "border-red-500" : ""}
                          />
                          {errors.street && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.street}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="number" className="text-sm sm:text-base">Número</Label>
                          <Input
                            id="number"
                            placeholder="Número"
                            value={formData.number}
                            onChange={handleInputChange}
                            required
                            className={errors.number ? "border-red-500" : ""}
                          />
                          {errors.number && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.number}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="complement" className="text-sm sm:text-base">Complemento</Label>
                          <Input
                            id="complement"
                            placeholder="Complemento (opcional)"
                            value={formData.complement}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="neighborhood" className="text-sm sm:text-base">Bairro</Label>
                          <Input
                            id="neighborhood"
                            placeholder="Bairro"
                            value={formData.neighborhood}
                            onChange={handleInputChange}
                            required
                            className={errors.neighborhood ? "border-red-500" : ""}
                          />
                          {errors.neighborhood && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.neighborhood}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm sm:text-base">Cidade</Label>
                          <Input
                            id="city"
                            placeholder="Cidade"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className={errors.city ? "border-red-500" : ""}
                          />
                          {errors.city && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.city}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-sm sm:text-base">Estado</Label>
                          <Input
                            id="state"
                            placeholder="Estado"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className={errors.state ? "border-red-500" : ""}
                          />
                          {errors.state && (
                            <p className="text-xs sm:text-sm text-red-500">{errors.state}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-4">
                        <Label className="text-sm sm:text-base">Já trabalhou com locação de veículos?</Label>
                        <RadioGroup
                          value={formData.hasRentalExperience}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, hasRentalExperience: value }))}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="hasRentalExperience-sim" />
                            <Label htmlFor="hasRentalExperience-sim" className="text-sm sm:text-base">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="hasRentalExperience-nao" />
                            <Label htmlFor="hasRentalExperience-nao" className="text-sm sm:text-base">Não</Label>
                          </div>
                        </RadioGroup>
                        {errors.hasRentalExperience && (
                          <p className="text-xs sm:text-sm text-red-500">{errors.hasRentalExperience}</p>
                        )}
                      </div>

                      {formData.hasRentalExperience === "sim" && (
                        <>
                          <div className="space-y-4">
                            <Label className="text-sm sm:text-base">Qual tipo de experiência?</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="taxi"
                                  value="taxi"
                                  checked={formData.rentalExperienceType.includes("taxi")}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="taxi" className="text-sm sm:text-base">Frota de Taxi / Taxi particular</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="app"
                                  value="app"
                                  checked={formData.rentalExperienceType.includes("app")}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="app" className="text-sm sm:text-base">Locadora de carros para apps (Unidas, Movida, Kovi, etc.)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="ambos"
                                  value="ambos"
                                  checked={formData.rentalExperienceType.includes("ambos")}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="ambos" className="text-sm sm:text-base">Ambos</Label>
                              </div>
                            </div>
                            {errors.rentalExperienceType && (
                              <p className="text-xs sm:text-sm text-red-500">{errors.rentalExperienceType}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="rentalExperienceTime" className="text-sm sm:text-base">Tempo de experiência</Label>
                            <Input
                              id="rentalExperienceTime"
                              placeholder="Ex: 2 anos com taxi de frota, 6 meses com carro da Kovi"
                              value={formData.rentalExperienceTime}
                              onChange={handleInputChange}
                              className={errors.rentalExperienceTime ? "border-red-500" : ""}
                            />
                            {errors.rentalExperienceTime && (
                              <p className="text-xs sm:text-sm text-red-500">{errors.rentalExperienceTime}</p>
                            )}
                          </div>
                        </>
                      )}

                      <div className="space-y-4">
                        <Label className="text-sm sm:text-base">Já teve problemas com locadora ou frota?</Label>
                        <RadioGroup
                          value={formData.hasRentalProblems}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, hasRentalProblems: value }))}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="hasRentalProblems-sim" />
                            <Label htmlFor="hasRentalProblems-sim" className="text-sm sm:text-base">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="hasRentalProblems-nao" />
                            <Label htmlFor="hasRentalProblems-nao" className="text-sm sm:text-base">Não</Label>
                          </div>
                        </RadioGroup>
                        {errors.hasRentalProblems && (
                          <p className="text-xs sm:text-sm text-red-500">{errors.hasRentalProblems}</p>
                        )}
                      </div>

                      {formData.hasRentalProblems === "sim" && (
                        <div className="space-y-2">
                          <Label htmlFor="rentalProblemsDetails" className="text-sm sm:text-base">Detalhe os problemas</Label>
                          <Input
                            id="rentalProblemsDetails"
                            placeholder="Explique brevemente os problemas ocorridos"
                            value={formData.rentalProblemsDetails}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}

                      <div className="space-y-4">
                        <Label className="text-sm sm:text-base">Já deixou alguma dívida com locadora ou frota?</Label>
                        <RadioGroup
                          value={formData.hasRentalDebt}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, hasRentalDebt: value }))}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="hasRentalDebt-sim" />
                            <Label htmlFor="hasRentalDebt-sim" className="text-sm sm:text-base">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="hasRentalDebt-nao" />
                            <Label htmlFor="hasRentalDebt-nao" className="text-sm sm:text-base">Não</Label>
                          </div>
                        </RadioGroup>
                        {errors.hasRentalDebt && (
                          <p className="text-xs sm:text-sm text-red-500">{errors.hasRentalDebt}</p>
                        )}
                      </div>

                      {formData.hasRentalDebt === "sim" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="rentalDebtValue" className="text-sm sm:text-base">Valor da dívida</Label>
                            <Input
                              id="rentalDebtValue"
                              placeholder="R$ 0,00"
                              value={formData.rentalDebtValue}
                              onChange={handleInputChange}
                              className={errors.rentalDebtValue ? "border-red-500" : ""}
                            />
                            {errors.rentalDebtValue && (
                              <p className="text-xs sm:text-sm text-red-500">{errors.rentalDebtValue}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rentalDebtReason" className="text-sm sm:text-base">Motivo da dívida</Label>
                            <Input
                              id="rentalDebtReason"
                              placeholder="Explique o motivo da dívida"
                              value={formData.rentalDebtReason}
                              onChange={handleInputChange}
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold">Contatos de Referência</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="reference1Name" className="text-sm sm:text-base">Nome da Referência 1</Label>
                              <Input
                                id="reference1Name"
                                placeholder="Nome completo"
                                value={formData.reference1Name}
                                onChange={handleInputChange}
                                className={errors.reference1 ? "border-red-500" : ""}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reference1Relationship" className="text-sm sm:text-base">Relação</Label>
                              <Input
                                id="reference1Relationship"
                                placeholder="Grau de parentesco ou relação"
                                value={formData.reference1Relationship}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reference1Phone" className="text-sm sm:text-base">Telefone</Label>
                              <Input
                                id="reference1Phone"
                                placeholder="(00) 00000-0000"
                                value={formData.reference1Phone}
                                onChange={handleInputChange}
                                maxLength={15}
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="reference2Name" className="text-sm sm:text-base">Nome da Referência 2</Label>
                              <Input
                                id="reference2Name"
                                placeholder="Nome completo"
                                value={formData.reference2Name}
                                onChange={handleInputChange}
                                className={errors.reference2 ? "border-red-500" : ""}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reference2Relationship" className="text-sm sm:text-base">Relação</Label>
                              <Input
                                id="reference2Relationship"
                                placeholder="Grau de parentesco ou relação"
                                value={formData.reference2Relationship}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reference2Phone" className="text-sm sm:text-base">Telefone</Label>
                              <Input
                                id="reference2Phone"
                                placeholder="(00) 00000-0000"
                                value={formData.reference2Phone}
                                onChange={handleInputChange}
                                maxLength={15}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto">
                        Voltar
                      </Button>
                    ) : (
                      <Link href="/" className="w-full sm:w-auto">
                        <Button type="button" variant="outline" className="w-full">
                          Cancelar
                        </Button>
                      </Link>
                    )}
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Enviando..." : step < 2 ? "Próximo" : "Finalizar Cadastro"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-4 sm:py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 Grupo Michelines. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
