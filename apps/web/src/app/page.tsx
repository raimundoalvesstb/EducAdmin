"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Calendar, GraduationCap, TrendingUp, Settings } from "lucide-react";

const bentoItems = [
  {
    title: "Alunos Matriculados",
    value: "1.240",
    icon: <Users className="w-8 h-8 text-primary" />,
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.1,
  },
  {
    title: "Turmas Ativas",
    value: "42",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    colSpan: "col-span-1",
    delay: 0.2,
  },
  {
    title: "Média Escolar",
    value: "7.8",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    colSpan: "col-span-1",
    delay: 0.3,
  },
  {
    title: "Professores",
    value: "85",
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.4,
  },
  {
    title: "Calendário",
    value: "2 Eventos Hoje",
    icon: <Calendar className="w-8 h-8 text-primary" />,
    colSpan: "col-span-1 md:col-span-3 lg:col-span-2",
    delay: 0.5,
  },
  {
    title: "Configurações",
    value: "Sistema",
    icon: <Settings className="w-8 h-8 text-primary" />,
    colSpan: "col-span-1 lg:col-span-1",
    delay: 0.6,
  }
];

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Visão Geral
        </h1>
        <p className="text-muted-foreground text-lg">
          Bem-vindo ao EducAdmin. Aqui está o resumo da sua instituição.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px]">
        {bentoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: item.delay, type: "spring", bounce: 0.4 }}
            className={`glass rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ${item.colSpan}`}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
              <div className="p-2 bg-background/50 rounded-2xl">{item.icon}</div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-foreground">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
