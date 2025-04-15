'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AvaliarPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    driverName: '',
    comment: '',
    passengerName: '',
    passengerEmail: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (rating === 0) {
      setError('Por favor, selecione uma avaliação');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'evaluations'), {
        ...formData,
        rating,
        status: 'pending',
        createdAt: new Date(),
      });

      router.push('/avaliacao-enviada');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      setError('Erro ao enviar avaliação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Avaliar Motorista
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="driverName" className="text-gray-700 font-medium">
                  Nome do Motorista
                </Label>
                <Input
                  id="driverName"
                  value={formData.driverName}
                  onChange={(e) =>
                    setFormData({ ...formData, driverName: e.target.value })
                  }
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Avaliação</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment" className="text-gray-700 font-medium">
                  Comentário
                </Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerName" className="text-gray-700 font-medium">
                    Seu Nome
                  </Label>
                  <Input
                    id="passengerName"
                    value={formData.passengerName}
                    onChange={(e) =>
                      setFormData({ ...formData, passengerName: e.target.value })
                    }
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengerEmail" className="text-gray-700 font-medium">
                    Seu Email
                  </Label>
                  <Input
                    id="passengerEmail"
                    type="email"
                    value={formData.passengerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, passengerEmail: e.target.value })
                    }
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Avaliação'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 