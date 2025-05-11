type StatKeyLabelProps = {
  value: string;
};

export const StatKeyLabel = ({ value }: StatKeyLabelProps) => {
  const map: Record<string, string> = {
    total_lessons: "Lecciones completadas",
    total_lessons_perfect: "Lecciones perfectas",
    total_challenges: "Retos completados",
    total_correct_answers: "Respuestas correctas",
    total_wrong_answers: "Respuestas incorrectas",
    total_units_completed: "Unidades completadas",
    total_missions: "Misiones completadas",
    total_points: "Puntos acumulados",
    total_experience: "Experiencia acumulada",
    quizzes_completed: "Quizzes completados",
  };

  return <span>{map[value] || value}</span>;
};
