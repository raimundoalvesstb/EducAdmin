"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, CheckCircle2, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Turma {
  id: string;
  nome: string;
}

interface Aluno {
  id: string;
  nomeCompleto: string;
  matricula: string;
}

interface MatriculaRecord {
  id: string;
  status: string;
  dataMatricula: string;
  aluno: Aluno;
}

export default function MatriculasPage() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("");
  const [matriculas, setMatriculas] = useState<MatriculaRecord[]>([]);

  // Estados para o Modal de Matrícula
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunosDisponiveis, setAlunosDisponiveis] = useState<Aluno[]>([]);
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState<string>("");
  const [salvando, setSalvando] = useState(false);

  const [carregando, setCarregando] = useState(true);
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
          if (data.length > 0) {
            setTurmaSelecionada(data[0].id);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
      } finally {
        setCarregando(false);
      }
    };
    carregarTurmas();
  }, [router]);

  useEffect(() => {
    if (!turmaSelecionada) return;

    const carregarMatriculas = async () => {
      setCarregando(true);
      const token = localStorage.getItem("access_token");
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/matriculas/turma/${turmaSelecionada}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setMatriculas(data);
        }
      } catch (error) {
        console.error("Erro ao carregar matrículas:", error);
      } finally {
        setCarregando(false);
      }
    };
    carregarMatriculas();
  }, [turmaSelecionada]);

  const abrirModalMatricula = async () => {
    setIsModalOpen(true);
    setAlunoSelecionadoId("");
    const token = localStorage.getItem("access_token");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      // Busca todos os alunos
      const response = await fetch(`${apiUrl}/alunos`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const todosAlunos: Aluno[] = await response.json();
        // Filtra alunos que já estão nesta turma para não matricular duplicado
        const matriculadosIds = matriculas.map(m => m.aluno.id);
        const naoMatriculados = todosAlunos.filter(a => !matriculadosIds.includes(a.id));
        setAlunosDisponiveis(naoMatriculados);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos para matrícula:", error);
    }
  };

  const handleMatricular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alunoSelecionadoId || !turmaSelecionada) return;

    setSalvando(true);
    const token = localStorage.getItem("access_token");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/matriculas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          alunoId: alunoSelecionadoId,
          turmaId: turmaSelecionada
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        // Atualiza a listagem de matrículas
        const matriculaNova = await res.json();
        // Recarregar a lista seria o ideal, ou podemos simular um fetch local. Por segurança:
        const responseList = await fetch(`${apiUrl}/matriculas/turma/${turmaSelecionada}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if(responseList.ok) {
            setMatriculas(await responseList.json());
        }
      }
    } catch (error) {
      console.error("Erro ao realizar matrícula:", error);
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
            Matrículas
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Associe estudantes às turmas acadêmicas
          </p>
        </div>

        <button
          onClick={abrirModalMatricula}
          disabled={!turmaSelecionada || turmas.length === 0}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          Nova Matrícula
        </button>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Seletora de Turmas */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1 glass rounded-3xl p-4 flex flex-col gap-2 h-fit"
        >
            <h3 className="font-semibold px-2 mb-2 text-foreground">Turmas Ativas</h3>
            {turmas.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">Nenhuma turma cadastrada.</p>
            ) : (
                turmas.map(turma => (
                    <button
                        key={turma.id}
                        onClick={() => setTurmaSelecionada(turma.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl transition-all ${turmaSelecionada === turma.id ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted/50 text-foreground'}`}
                    >
                        <span className="font-medium truncate pr-2">{turma.nome}</span>
                        {turmaSelecionada === turma.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                    </button>
                ))
            )}
        </motion.div>

        {/* Listagem Central de Matrículas */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-3 glass rounded-3xl p-6 md:p-8 min-h-[500px]"
        >
            {carregando ? (
                <div className="flex justify-center items-center h-full">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : !turmaSelecionada ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Users className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Selecione uma turma para ver os alunos.</p>
                </div>
            ) : matriculas.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Users className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Nenhum aluno matriculado nesta turma.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                            {turmas.find(t => t.id === turmaSelecionada)?.nome}
                        </h2>
                        <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {matriculas.length} aluno(s)
                        </span>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-muted">
                                <th className="pb-4 font-medium text-muted-foreground">Aluno</th>
                                <th className="pb-4 font-medium text-muted-foreground">Matrícula Escolar</th>
                                <th className="pb-4 font-medium text-muted-foreground">Status na Turma</th>
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
                                    <td className="py-4 font-medium text-foreground">{mat.aluno.nomeCompleto}</td>
                                    <td className="py-4 text-muted-foreground">{mat.aluno.matricula || "Não informada"}</td>
                                    <td className="py-4">
                                        <span className={`flex items-center w-fit gap-1 px-3 py-1 rounded-full text-xs font-medium ${mat.status === 'ATIVA' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            {mat.status === 'ATIVA' && <CheckCircle2 className="w-3 h-3" />}
                                            {mat.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
      </div>

      {/* Modal Glassmorphism para Nova Matrícula */}
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

              <h2 className="text-2xl font-bold text-foreground mb-6">Matricular Aluno</h2>

              <form onSubmit={handleMatricular} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Turma Destino</label>
                  <input
                    type="text"
                    disabled
                    value={turmas.find(t => t.id === turmaSelecionada)?.nome || ""}
                    className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-muted text-muted-foreground cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Selecionar Aluno</label>
                  <select
                    required
                    value={alunoSelecionadoId}
                    onChange={(e) => setAlunoSelecionadoId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-background/50 border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                  >
                    <option value="" disabled>Escolha um aluno disponível...</option>
                    {alunosDisponiveis.map(aluno => (
                        <option key={aluno.id} value={aluno.id}>
                            {aluno.nomeCompleto} {aluno.matricula ? `(${aluno.matricula})` : ""}
                        </option>
                    ))}
                  </select>
                  {alunosDisponiveis.length === 0 && (
                      <p className="text-xs text-orange-500 mt-1 pl-2">Não há alunos disponíveis (todos já matriculados ou sem cadastro).</p>
                  )}
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
                    disabled={salvando || !alunoSelecionadoId}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md"
                  >
                    {salvando ? 'Salvando...' : 'Confirmar Matrícula'}
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
