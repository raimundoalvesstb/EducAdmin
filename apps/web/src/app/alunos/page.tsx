"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, UserCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Aluno {
  id: string;
  nomeCompleto: string;
  matricula: string;
  ativo: boolean;
}

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoAluno, setNovoAluno] = useState({ nomeCompleto: "", dataNascimento: "", matricula: "", cpf: "" });
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  const buscarAlunos = async () => {
    setCarregando(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/alunos`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        router.push("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setAlunos(data);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarAlunos();
  }, [router]);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    const token = localStorage.getItem("access_token");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/alunos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(novoAluno)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNovoAluno({ nomeCompleto: "", dataNascimento: "", matricula: "", cpf: "" });
        await buscarAlunos();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setSalvando(false);
    }
  };

  const alunosFiltrados = alunos.filter(a =>
    a.nomeCompleto.toLowerCase().includes(busca.toLowerCase()) ||
    (a.matricula && a.matricula.includes(busca))
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
            Alunos
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Gestão e listagem de estudantes matriculados
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          Novo Aluno
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
              placeholder="Buscar aluno por nome ou matrícula..."
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
        ) : alunosFiltrados.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <UserCircle2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Nenhum aluno encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-muted">
                  <th className="pb-4 font-medium text-muted-foreground">Nome Completo</th>
                  <th className="pb-4 font-medium text-muted-foreground">Matrícula</th>
                  <th className="pb-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={aluno.id}
                    className="border-b border-muted/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-4 font-medium text-foreground">{aluno.nomeCompleto}</td>
                    <td className="py-4 text-muted-foreground">{aluno.matricula || "Não informada"}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${aluno.ativo ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {aluno.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal Glassmorphism para Novo Aluno */}
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

              <h2 className="text-2xl font-bold text-foreground mb-6">Cadastrar Aluno</h2>

              <form onSubmit={handleSalvar} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={novoAluno.nomeCompleto}
                    onChange={(e) => setNovoAluno({...novoAluno, nomeCompleto: e.target.value})}
                    className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                    placeholder="Ex: João da Silva"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Data Nascimento</label>
                    <input
                      type="date"
                      required
                      value={novoAluno.dataNascimento}
                      onChange={(e) => setNovoAluno({...novoAluno, dataNascimento: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Matrícula</label>
                    <input
                      type="text"
                      value={novoAluno.matricula}
                      onChange={(e) => setNovoAluno({...novoAluno, matricula: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                      placeholder="Opcional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">CPF (Opcional)</label>
                  <input
                    type="text"
                    value={novoAluno.cpf}
                    onChange={(e) => setNovoAluno({...novoAluno, cpf: e.target.value})}
                    className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                    placeholder="000.000.000-00"
                  />
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
                    {salvando ? 'Salvando...' : 'Salvar Aluno'}
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
