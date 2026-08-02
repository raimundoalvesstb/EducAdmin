"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, BookOpen, X, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface Turma {
  id: string;
  nome: string;
  anoLetivo: number;
  turno: string;
  capacidade: number;
  ativo: boolean;
}

export default function TurmasPage() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaTurma, setNovaTurma] = useState({ nome: "", anoLetivo: new Date().getFullYear(), turno: "MATUTINO", capacidade: 40 });
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  const buscarTurmas = async () => {
    setCarregando(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/turmas`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        router.push("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setTurmas(data);
      }
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarTurmas();
  }, [router]);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    const token = localStorage.getItem("access_token");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/turmas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(novaTurma)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNovaTurma({ nome: "", anoLetivo: new Date().getFullYear(), turno: "MATUTINO", capacidade: 40 });
        await buscarTurmas();
      }
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
    } finally {
      setSalvando(false);
    }
  };

  const turmasFiltradas = turmas.filter(t =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    t.anoLetivo.toString().includes(busca)
  );

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Turmas
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Gestão de classes e estrutura acadêmica
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          Nova Turma
        </button>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-6 md:p-8 relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar turma por nome ou ano..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
            />
          </div>
        </div>

        {carregando ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : turmasFiltradas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Nenhuma turma encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {turmasFiltradas.map((turma, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={turma.id}
                className="p-6 rounded-2xl border border-muted bg-background/30 hover:bg-muted/20 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">{turma.nome}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${turma.ativo ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {turma.ativo ? 'Ativa' : 'Inativa'}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Ano Letivo:</span>
                    <span className="font-medium text-foreground">{turma.anoLetivo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turno:</span>
                    <span className="font-medium text-foreground">{turma.turno}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-muted/50 mt-2">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Capacidade:</span>
                    </div>
                    <span className="font-medium text-foreground">0 / {turma.capacidade}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal Glassmorphism para Nova Turma */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <h2 className="text-2xl font-bold text-foreground mb-6">Cadastrar Turma</h2>

              <form onSubmit={handleSalvar} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Nome da Turma</label>
                  <input
                    type="text"
                    required
                    value={novaTurma.nome}
                    onChange={(e) => setNovaTurma({...novaTurma, nome: e.target.value})}
                    className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                    placeholder="Ex: 1º Ano A"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Ano Letivo</label>
                    <input
                      type="number"
                      required
                      value={novaTurma.anoLetivo}
                      onChange={(e) => setNovaTurma({...novaTurma, anoLetivo: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Capacidade (Vagas)</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={novaTurma.capacidade}
                      onChange={(e) => setNovaTurma({...novaTurma, capacidade: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Turno</label>
                  <select
                    value={novaTurma.turno}
                    onChange={(e) => setNovaTurma({...novaTurma, turno: e.target.value})}
                    className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                  >
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                    <option value="NOTURNO">Noturno</option>
                    <option value="INTEGRAL">Integral</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-2xl font-medium border border-muted text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={salvando}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md"
                  >
                    {salvando ? 'Salvando...' : 'Salvar Turma'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
