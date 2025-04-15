import { FileText, Shield, Wrench, Car } from "lucide-react"

export default function ServicosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-gray-600">
            A Michelines oferece uma gama completa de serviços para facilitar o trabalho dos motoristas de táxi. Conheça
            abaixo tudo o que oferecemos para nossos parceiros.
          </p>
        </div>

        <div className="space-y-16">
          <section id="administrativo" className="scroll-mt-20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-yellow-500 p-4 rounded-full md:mt-2">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Suporte Administrativo</h2>
                <p className="text-gray-600 mb-4">
                  Cuidamos de toda a burocracia para que você possa focar no seu trabalho como taxista. Nossa equipe
                  administrativa está preparada para lidar com todos os aspectos burocráticos da profissão.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Renovação de licenças e alvarás</li>
                  <li>Gestão de documentação junto aos órgãos reguladores</li>
                  <li>Suporte para emissão de notas fiscais</li>
                  <li>Assessoria para questões relacionadas ao DTP (Departamento de Transportes Públicos)</li>
                  <li>Orientação sobre normas e regulamentações do setor</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="juridico" className="scroll-mt-20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-yellow-500 p-4 rounded-full md:mt-2">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Suporte Jurídico</h2>
                <p className="text-gray-600 mb-4">
                  Oferecemos assistência jurídica especializada para questões relacionadas à atividade de taxista,
                  garantindo tranquilidade no seu dia a dia profissional.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Orientação sobre direitos e deveres dos taxistas</li>
                  <li>Assistência em caso de multas e infrações de trânsito</li>
                  <li>Suporte para questões relacionadas a seguros e sinistros</li>
                  <li>Consultoria para resolução de conflitos com passageiros</li>
                  <li>Acompanhamento de processos administrativos junto aos órgãos reguladores</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="mecanico" className="scroll-mt-20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-yellow-500 p-4 rounded-full md:mt-2">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Suporte Mecânico</h2>
                <p className="text-gray-600 mb-4">
                  Mantemos sua frota sempre em perfeitas condições, com manutenção preventiva e corretiva, evitando
                  paradas não programadas e garantindo a segurança dos passageiros.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Revisões periódicas programadas</li>
                  <li>Atendimento emergencial em caso de panes</li>
                  <li>Troca de óleo e filtros</li>
                  <li>Manutenção de freios, suspensão e direção</li>
                  <li>Verificação e manutenção de sistemas elétricos</li>
                  <li>Preparação para vistorias obrigatórias</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="dtaxi" className="scroll-mt-20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-yellow-500 p-4 rounded-full md:mt-2">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Parceria Dtáxi</h2>
                <p className="text-gray-600 mb-4">
                  Através da nossa parceria exclusiva com a Dtáxi, oferecemos acesso ao aeroporto de Congonhas,
                  ampliando suas oportunidades de corridas e aumentando sua rentabilidade.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Acesso exclusivo ao ponto de táxi do aeroporto de Congonhas</li>
                  <li>Sistema de fila organizado e justo</li>
                  <li>Possibilidade de atendimento a executivos e turistas</li>
                  <li>Corridas de maior valor médio</li>
                  <li>Integração com o sistema de reservas antecipadas</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

