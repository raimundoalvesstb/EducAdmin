"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      router.push('/');
    } catch (err: any) {
      setErro(err.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass rounded-3xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-md mx-auto mb-4">
            E
          </div>
          <h1 className="text-2xl font-bold text-foreground">Bem-vindo ao EducAdmin</h1>
          <p className="text-muted-foreground mt-2">Faça login para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {erro && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center">
              {erro}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-3 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
