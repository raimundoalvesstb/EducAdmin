"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, ChevronRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Turma {
  id: string;
  nome: string;
}

interface Avaliacao {
  id: string;
  nome: string;
  peso: number;
  dataAvaliacao: string;
}

interface Aluno {
  id: string;
  nomeCompleto: string;
}

interface Matricula {
  id: string;
  aluno: Aluno;
}

export default function NotasPage() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("");

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<string>("");

  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [notas, setNotas] = useState<Record<string, number>>({});

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaAvaliacao, setNovaAvaliacao] = useState({ nome: "", peso: 10, dataAvaliacao: new Date().toISOString().split('T')[0] });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const carregarTurmas = async () => {
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
        if (response.ok) {
          const data = await response.json();
          setTurmas(data);
          if (data.length > 0) setTurmaSelecionada(data[0].id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    carregarTurmas();
  }, [router]);

  useEffect(() => {
    if (!turmaSelecionada) return;

    const carregarDadosTurma = async () => {
      setCarregando(true);
      const token = localStorage.getItem("access_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      try {
        const [resMatriculas, resAvaliacoes] = await Promise.all([
            fetch(`${apiUrl}/matriculas/turma/${turmaSelecionada}`, { headers: { "Authorization": `Bearer ${token}` } }),
            fetch(`${apiUrl}/avaliacoes/turma/${turmaSelecionada}`, { headers: { "Authorization": `Bearer ${token}` } })
        ]);

        if (resMatriculas.ok && resAvaliacoes.ok) {
          const mats = await resMatriculas.json();
          const avs = await resAvaliacoes.json();
          setMatriculas(mats);
          setAvaliacoes(avs);
          if (avs.length > 0) {
              setAvaliacaoSelecionada(avs[0].id);
          } else {
              setAvaliacaoSelecionada("");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    carregarDadosTurma();
  }, [turmaSelecionada]);

  // Quando avaliacao selecionada mudar, buscar histórico das notas para popular input
  useEffect(() => {
    if (!avaliacaoSelecionada) return;

    const carregarNotasHistoricas = async () => {
        const token = localStorage.getItem("access_token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        try {
            const res = await fetch(`${apiUrl}/notas/avaliacao/${avaliacaoSelecionada}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const notasBd = await res.json();
                const dictNotas: Record<string, number> = {};
                notasBd.forEach((n: any) => {
                    if (n.matricula?.id) dictNotas[n.matricula.id] = n.valor;
                });
                setNotas(dictNotas);
            }
        } catch (error) {
            console.error("Erro ao buscar histórico de notas", error);
        }
    };

    carregarNotasHistoricas();
  }, [avaliacaoSelecionada]);

  const handleCriarAvaliacao = async (e: React.FormEvent) => {
      e.preventDefault();
      setSalvando(true);
      const token = localStorage.getItem("access_token");
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/avaliacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...novaAvaliacao, turma: { id: turmaSelecionada } })
        });

        if (res.ok) {
            const avCriada = await res.json();
            setAvaliacoes([avCriada, ...avaliacoes]);
            setAvaliacaoSelecionada(avCriada.id);
            setIsModalOpen(false);
            setNovaAvaliacao({ nome: "", peso: 10, dataAvaliacao: new Date().toISOString().split('T')[0] });
        }
      } catch (error) {
          console.error(error);
      } finally {
          setSalvando(false);
      }
  };

  const handleSalvarNotas = async () => {
    setSalvando(true);
    const token = localStorage.getItem("access_token");
    const payload = Object.keys(notas).map(matriculaId => ({
        valor: notas[matriculaId],
        matricula: { id: matriculaId },
        avaliacao: { id: avaliacaoSelecionada }
    }));

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/notas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) alert("Notas salvas com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Lançamento de Notas
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Crie avaliações e registre o desempenho dos alunos
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1 flex flex-col gap-6"
        >
            <div className="glass rounded-3xl p-4 flex flex-col gap-2">
                <h3 className="font-semibold px-2 mb-2 text-foreground">Turmas</h3>
                {turmas.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">Nenhuma turma cadastrada.</p>
                ) : (
                    turmas.map(turma => (
                        <button
                            key={turma.id}
                            onClick={() => setTurmaSelecionada(turma.id)}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all ${turmaSelecionada === turma.id ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted/50 text-foreground'}`}
                        >
                            <span className="font-medium text-sm truncate pr-2">{turma.nome}</span>
                            {turmaSelecionada === turma.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                        </button>
                    ))
                )}
            </div>

            {turmaSelecionada && (
                <div className="glass rounded-3xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="font-semibold text-foreground">Avaliações</h3>
                        <button onClick={() => setIsModalOpen(true)} className="p-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    {avaliacoes.length === 0 ? (
                        <p className="text-sm text-muted-foreground p-2">Nenhuma avaliação nesta turma.</p>
                    ) : (
                        avaliacoes.map(av => (
                            <button
                                key={av.id}
                                onClick={() => setAvaliacaoSelecionada(av.id)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all ${avaliacaoSelecionada === av.id ? 'bg-secondary text-secondary-foreground shadow-md' : 'hover:bg-muted/50 text-foreground'}`}
                            >
                                <span className="font-medium text-sm truncate pr-2">{av.nome}</span>
                                {avaliacaoSelecionada === av.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                            </button>
                        ))
                    )}
                </div>
            )}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-3 glass rounded-3xl p-6 md:p-8 min-h-[500px] flex flex-col"
        >
            {carregando ? (
                <div className="flex justify-center items-center h-full flex-1">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : !turmaSelecionada ? (
                <div className="flex flex-col items-center justify-center h-full flex-1 text-muted-foreground">
                    <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Selecione uma turma.</p>
                </div>
            ) : !avaliacaoSelecionada ? (
                <div className="flex flex-col items-center justify-center h-full flex-1 text-muted-foreground">
                    <GraduationCap className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Crie ou selecione uma avaliação para lançar notas.</p>
                </div>
            ) : matriculas.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full flex-1 text-muted-foreground">
                    <p className="text-lg">Nenhum aluno matriculado nesta turma.</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                            Notas: {avaliacoes.find(a => a.id === avaliacaoSelecionada)?.nome}
                        </h2>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-muted">
                                    <th className="pb-4 font-medium text-muted-foreground">Aluno</th>
                                    <th className="pb-4 font-medium text-muted-foreground w-32">Nota (0 - 10)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.map((mat, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={mat.id}
                                        className="border-b border-muted/50 hover:bg-muted/20 transition-colors"
                                    >
                                        <td className="py-3 font-medium text-foreground">{mat.aluno.nomeCompleto}</td>
                                        <td className="py-3">
                                            <input
                                                type="number"
                                                min="0" max="10" step="0.1"
                                                value={notas[mat.id] || ""}
                                                onChange={(e) => setNotas(prev => ({...prev, [mat.id]: parseFloat(e.target.value)}))}
                                                className="w-full px-3 py-2 rounded-xl bg-background/50 border border-muted text-foreground focus:ring-1 focus:ring-primary outline-none"
                                            />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pt-6 mt-4 border-t border-muted flex justify-end">
                        <button
                            onClick={handleSalvarNotas}
                            disabled={salvando}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
                        >
                            {salvando ? 'Salvando...' : 'Salvar Notas'}
                        </button>
                    </div>
                </>
            )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted/50 transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <h2 className="text-2xl font-bold text-foreground mb-6">Nova Avaliação</h2>

              <form onSubmit={handleCriarAvaliacao} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Nome da Avaliação</label>
                  <input type="text" required value={novaAvaliacao.nome} onChange={(e) => setNovaAvaliacao({...novaAvaliacao, nome: e.target.value})} className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground" placeholder="Ex: Prova Bimestral 1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Data</label>
                    <input type="date" required value={novaAvaliacao.dataAvaliacao} onChange={(e) => setNovaAvaliacao({...novaAvaliacao, dataAvaliacao: e.target.value})} className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Peso (Valor Máx)</label>
                    <input type="number" min="0" step="0.5" required value={novaAvaliacao.peso} onChange={(e) => setNovaAvaliacao({...novaAvaliacao, peso: parseFloat(e.target.value)})} className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground" />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="submit" disabled={salvando} className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md">
                    {salvando ? 'Criando...' : 'Criar Avaliação'}
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
