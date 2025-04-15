import Link from "next/link";
import { routes } from "../../config/routes";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Grupo Michelines</h3>
            <p className="text-gray-400">
              Transporte executivo de qualidade com motoristas profissionais e veículos de luxo.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contato@michelines.com.br</li>
              <li>Telefone: (11) 99999-9999</li>
              <li>WhatsApp: (11) 99999-9999</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href={routes.about} className="text-gray-400 hover:text-white">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href={routes.services} className="text-gray-400 hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href={routes.vehicles} className="text-gray-400 hover:text-white">
                  Frota
                </Link>
              </li>
              <li>
                <Link href={routes.contact} className="text-gray-400 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Grupo Michelines. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 