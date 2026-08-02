"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Check, X, ClipboardCheck, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Turma {
  id: string;
  nome: string;
}

interface Aluno {
  id: string;
  nomeCompleto: string;
}

interface Matricula {
  id: string;
  aluno: Aluno;
}

export default function DiarioPage() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("");
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);

  // Estado local das frequências: chave = matricula_id, valor = "PRESENTE" | "FALTA" | "FALTA_JUSTIFICADA"
  const [frequencia, setFrequencia] = useState<Record<string, string>>({});

  const [dataAula, setDataAula] = useState<string>(new Date().toISOString().split('T')[0]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

  // Buscar turmas ao carregar
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

  // Buscar matriculados e histórico de chamada ao selecionar turma ou data
  useEffect(() => {
    if (!turmaSelecionada) return;

    const carregarMatriculasEHistorico = async () => {
      setCarregando(true);
      const token = localStorage.getItem("access_token");
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // 1. Carrega os alunos matriculados
        const resMat = await fetch(`${apiUrl}/matriculas/turma/${turmaSelecionada}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        // 2. Carrega as presenças já registradas nesta turma para esta data
        const resFreq = await fetch(`${apiUrl}/frequencias?turmaId=${turmaSelecionada}&dataAula=${dataAula}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (resMat.ok && resFreq.ok) {
          const matriculadosData = await resMat.json();
          const historicoFreqData = await resFreq.json();

          setMatriculas(matriculadosData);

          const frequenciaInicial: Record<string, string> = {};
          // Iniciar todos como PRESENTE
          matriculadosData.forEach((m: Matricula) => {
              frequenciaInicial[m.id] = "PRESENTE";
          });

          // Sobrescrever se já houver registro gravado no dia
          historicoFreqData.forEach((freqRecord: any) => {
              // Assegura pegar a chave da matricula do relacionamento se retornar populado
              if (freqRecord.matricula?.id) {
                 frequenciaInicial[freqRecord.matricula.id] = freqRecord.presenca;
              }
          });

          setFrequencia(frequenciaInicial);
        }
      } catch (error) {
        console.error("Erro ao carregar matrículas/histórico:", error);
      } finally {
        setCarregando(false);
      }
    };
    carregarMatriculasEHistorico();
  }, [turmaSelecionada, dataAula]);

  const alternarPresenca = (matriculaId: string) => {
      setFrequencia(prev => ({
          ...prev,
          [matriculaId]: prev[matriculaId] === "PRESENTE" ? "FALTA" : "PRESENTE"
      }));
  };

  const handleSalvarDiario = async () => {
    setSalvando(true);
    const token = localStorage.getItem("access_token");

    const payload = matriculas.map(m => ({
        matricula: { id: m.id },
        dataAula: dataAula,
        presenca: frequencia[m.id]
    }));

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/frequencias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Diário de classe salvo com sucesso!");
      } else {
        alert("Erro ao salvar diário de classe.");
      }
    } catch (error) {
      console.error("Erro ao salvar diário:", error);
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
            Diário de Classe
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Lançamento de presenças e controle diário
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Seletora de Turmas */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1 glass rounded-3xl p-4 flex flex-col gap-4 h-fit"
        >
            <div>
                <h3 className="font-semibold px-2 mb-2 text-foreground">Data da Aula</h3>
                <input
                    type="date"
                    value={dataAula}
                    onChange={(e) => setDataAula(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-background/50 border border-muted text-sm text-foreground focus:ring-1 focus:ring-primary outline-none"
                />
            </div>

            <div className="pt-2 border-t border-muted/30">
                <h3 className="font-semibold px-2 mb-2 text-foreground">Turmas</h3>
                {turmas.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">Nenhuma turma cadastrada.</p>
                ) : (
                    <div className="flex flex-col gap-1">
                        {turmas.map(turma => (
                            <button
                                key={turma.id}
                                onClick={() => setTurmaSelecionada(turma.id)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all ${turmaSelecionada === turma.id ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted/50 text-foreground'}`}
                            >
                                <span className="font-medium text-sm truncate pr-2">{turma.nome}</span>
                                {turmaSelecionada === turma.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>

        {/* Listagem Central de Alunos / Chamada */}
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
                    <p className="text-lg">Selecione uma turma para realizar a chamada.</p>
                </div>
            ) : matriculas.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full flex-1 text-muted-foreground">
                    <ClipboardCheck className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Nenhum aluno matriculado nesta turma.</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                            Chamada: {turmas.find(t => t.id === turmaSelecionada)?.nome}
                        </h2>
                        <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {matriculas.length} aluno(s)
                        </span>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-muted">
                                    <th className="pb-4 font-medium text-muted-foreground">Aluno</th>
                                    <th className="pb-4 font-medium text-muted-foreground text-center">Presença</th>
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
                                        <td className="py-3 text-center">
                                            <button
                                                onClick={() => alternarPresenca(mat.id)}
                                                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm mx-auto
                                                    ${frequencia[mat.id] === 'PRESENTE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                                                `}
                                            >
                                                {frequencia[mat.id] === 'PRESENTE' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pt-6 mt-4 border-t border-muted flex justify-end">
                        <button
                            onClick={handleSalvarDiario}
                            disabled={salvando}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
                        >
                            {salvando ? 'Salvando...' : 'Salvar Diário'}
                        </button>
                    </div>
                </>
            )}
        </motion.div>
      </div>
    </main>
  );
}
