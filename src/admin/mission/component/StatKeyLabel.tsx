type StatKeyLabelProps = {
  value: string;
};

export const StatKeyLabel = ({ value }: StatKeyLabelProps) => {
  const map: Record<string, string> = {
    lessons_completed: "Lecciones completadas",
    lessons_perfect: "Lecciones perfectas",
    challenges_completed: "Retos completados",
    correct_answers: "Respuestas correctas",
    wrong_answers: "Respuestas incorrectas",
    experience_gained: "Experiencia ganada",
    points_gained: "Puntos ganados",
    time_spent_minutes: "Minutos activos",
    quizzes_completed: "Quizzes completados",
  };

  return <span>{map[value] || value}</span>;
};
