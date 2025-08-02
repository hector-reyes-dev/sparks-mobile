import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface Question {
  id: string;
  question: string;
  created_at: string;
}

export interface UserStats {
  current_streak: number;
  longest_streak: number;
  total_answers: number;
  average_score: number;
  last_answer_date?: string;
}

export interface Answer {
  id: string;
  question_id: string;
  answer_text: string;
  feedback: string;
  created_at: string;
  question?: Question;
}

// Hook para obtener la pregunta del día
export const useDailyQuestion = () => {
  return useQuery({
    queryKey: ['dailyQuestion'],
    queryFn: async () => {
      // Simulamos una pregunta del día
      const questions = [
        "Describe a challenging situation you faced at work and how you overcame it. What did you learn from this experience?",
        "What are your career goals for the next five years, and what steps are you taking to achieve them?",
        "How do you handle stress and pressure in a professional environment? Provide specific examples.",
        "Describe a time when you had to work with a difficult colleague or client. How did you manage the situation?",
        "What skills do you think are most important for success in your field, and how are you developing them?",
      ];
      
      const today = new Date().toDateString();
      const questionIndex = Math.abs(today.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % questions.length;
      
      return {
        id: `daily-${today}`,
        question: questions[questionIndex],
        created_at: new Date().toISOString(),
      } as Question;
    },
  });
};

// Hook para obtener estadísticas del usuario
export const useUserStats = () => {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      // Simulamos estadísticas del usuario usando localStorage
      const stats = localStorage.getItem('userStats');
      if (stats) {
        return JSON.parse(stats) as UserStats;
      }
      
      // Estadísticas por defecto
      const defaultStats: UserStats = {
        current_streak: 0,
        longest_streak: 0,
        total_answers: 0,
        average_score: 0,
      };
      
      localStorage.setItem('userStats', JSON.stringify(defaultStats));
      return defaultStats;
    },
  });
};

// Hook para obtener el historial de respuestas
export const useAnswerHistory = () => {
  return useQuery({
    queryKey: ['answerHistory'],
    queryFn: async () => {
      // Simulamos el historial usando localStorage
      const history = localStorage.getItem('answerHistory');
      if (history) {
        return JSON.parse(history) as Answer[];
      }
      return [] as Answer[];
    },
  });
};

// Hook para enviar respuesta
export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questionId,
      answer,
    }: {
      questionId: string;
      answer: string;
    }) => {
      // Simulamos el envío de respuesta
      const newAnswer: Answer = {
        id: Date.now().toString(),
        question_id: questionId,
        answer_text: answer,
        feedback: "Great response! Your answer shows good understanding of the topic and demonstrates clear communication skills.",
        created_at: new Date().toISOString(),
      };

      // Guardar en localStorage
      const history = localStorage.getItem('answerHistory');
      const answers = history ? JSON.parse(history) : [];
      answers.unshift(newAnswer);
      localStorage.setItem('answerHistory', JSON.stringify(answers));

      // Actualizar estadísticas
      const stats = localStorage.getItem('userStats');
      const currentStats: UserStats = stats ? JSON.parse(stats) : {
        current_streak: 0,
        longest_streak: 0,
        total_answers: 0,
        average_score: 0,
      };

      const today = new Date().toDateString();
      const lastAnswerDate = currentStats.last_answer_date ? new Date(currentStats.last_answer_date).toDateString() : null;
      
      // Calcular nuevo streak
      let newStreak = currentStats.current_streak;
      if (lastAnswerDate === today) {
        // Ya respondió hoy, no cambiar streak
      } else if (lastAnswerDate === new Date(Date.now() - 86400000).toDateString()) {
        // Respondió ayer, incrementar streak
        newStreak = currentStats.current_streak + 1;
      } else {
        // No respondió ayer, reiniciar streak
        newStreak = 1;
      }

      const updatedStats: UserStats = {
        current_streak: newStreak,
        longest_streak: Math.max(currentStats.longest_streak, newStreak),
        total_answers: currentStats.total_answers + 1,
        average_score: Math.min(100, currentStats.average_score + 5), // Simulamos mejora gradual
        last_answer_date: new Date().toISOString(),
      };

      localStorage.setItem('userStats', JSON.stringify(updatedStats));

      return newAnswer;
    },
    onSuccess: () => {
      // Invalidar queries para refrescar datos
      queryClient.invalidateQueries({ queryKey: ['dailyQuestion'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['answerHistory'] });
    },
  });
};