import Link from "next/link";
import Image from "next/image";
import { routes } from "../../config/routes";
import AdminAccessButton from "../admin-access-button";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={routes.home} className="flex items-center">
            <Image
              src="/images/logos/logo-grupo-michelines.png"
              alt="Grupo Michelines"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href={routes.about} className="text-gray-600 hover:text-primary">
              Sobre
            </Link>
            <Link href={routes.services} className="text-gray-600 hover:text-primary">
              Serviços
            </Link>
            <Link href={routes.vehicles} className="text-gray-600 hover:text-primary">
              Frota
            </Link>
            <Link href={routes.contact} className="text-gray-600 hover:text-primary">
              Contato
            </Link>
            <Link href={routes.evaluations} className="text-gray-600 hover:text-primary">
              Avaliações
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <AdminAccessButton />
          </div>
        </div>
      </div>
    </header>
  );
} 