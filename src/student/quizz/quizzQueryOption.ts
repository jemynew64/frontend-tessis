import { queryOptions } from "@tanstack/react-query";
import {obtenerQuizzforlesson} from "./quizz.service"

export  function useQuizzQueryOptions(lessonId: number) {
    return queryOptions({
        queryKey: ["quizz"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerQuizzforlesson(lessonId),  // aca es la consulta en mi caso es un get 
    });
}

// quizz.queryOptions.ts
// export const useLessonProgressQuery = (userId: number, lessonId: number) => ({
//   queryKey: ["lesson-progress", userId, lessonId],
//   queryFn: async () => {
//     const res = await fetch(`/api/lesson-progress/${userId}/${lessonId}`);
//     if (!res.ok) throw new Error("Error al consultar progreso de lección");
//     return res.json(); // debería retornar { completed: boolean }
//   },
// });


// const { data: progreso, isSuccess: loadedProgreso } = useQuery(
//   useLessonProgressQuery(user?.id, leccionid),
//   { enabled: !!user?.id }
// );

// const statsPayload = {
//   lessons_completed: progreso?.completed ? 0 : 1,
//   lessons_perfect: fuePerfecta ? 1 : 0,
//   challenges_completed: data.length,
//   correct_answers: correctas,
//   wrong_answers: incorrectas,
//   experience_gained: resultado.experience,
//   points_gained: resultado.points,
//   time_spent_minutes: minutos,
//   quizzes_completed: 1,
// };
