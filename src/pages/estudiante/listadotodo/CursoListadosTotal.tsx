import {LearningUnitProgress} from "../LearningUnitProgress"
import { LessonModule } from "../LessonModule";
import { ButtonDuo } from "../ButtonDuo";
import { useQuery } from "@tanstack/react-query";
import { useUserQueryOptions } from "./CursotodoQueryOption";


export const CursoListadosTotal = () => {
    const { data} = useQuery(useUserQueryOptions());
    // Agregar un console.log para ver el contenido de data
    console.log("Datos recibidos:", JSON.stringify(data, null, 2));
    return (
    <>
    <LearningUnitProgress >
        MATEMATICAS
    </LearningUnitProgress>
          <LessonModule
        title="Suma de Números"
        stage="ETAPA 1"
        className="bg-lime-600"
      />
    <ButtonDuo estaBloqueada={false} estaCompletada={false}  />
    </>
  )
}
