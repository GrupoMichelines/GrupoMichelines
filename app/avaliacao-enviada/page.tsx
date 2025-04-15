'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AvaliacaoEnviadaPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Avaliação Enviada com Sucesso!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-600">
              Obrigado por avaliar nosso motorista. Sua avaliação será analisada e
              publicada em breve.
            </p>
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => router.push('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Voltar para a Página Inicial
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/avaliar')}
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Enviar Outra Avaliação
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 