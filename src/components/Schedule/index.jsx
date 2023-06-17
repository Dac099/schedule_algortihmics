import { getDaysByMonth } from "../../utils/getDays";
import { useEffect, useState } from "react";
import { LessonsByDay } from "../LessonsByDay";
import { getMonth } from "../../utils/transformDates";
import { 
  getAllLessons,
  getAllInstructors, 
} from "../../firebase/firestore";

function Schedule(){
  const month = new Date().getMonth();
  const year = new Date().getFullYear();  
  const days = Object.values(getDaysByMonth(month + 1, year));
  const [lessons, setLessons] = useState();
  const [instructors, setInstructors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [onError, setOnError] = useState(false);

  useEffect(() => {
    const fetchAllLessons = async () => {
      try {
        setLessons(await getAllLessons());
        setInstructors(await getAllInstructors());

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setOnError(true);
      }
    }

    fetchAllLessons();
  }, []);

  //Todo: Hacer componente de carga
  //Todo: Hacer el componente de error

  if(isLoading){
    return (
      <h1>Obteniendo la informacion</h1>
    );
  }

  if(onError){
    return (
      <h1>Error al obtener la informacion, intentalo mas tarde</h1>
    );
  }

  function filterLessonsByDay(day){
    return lessons.filter(lesson => lesson.day === day);
  }

  return (
    <article>
      <section>
        <p>{`${getMonth(month)} ${year}`}</p>
        <article>
          <LessonsByDay 
            day={'Lunes'}  
            dates={days[0]}
            lessons={filterLessonsByDay('Lunes')}
          />
          <LessonsByDay 
            day={'Martes'} 
            dates={days[1]}
            lessons={filterLessonsByDay('Martes')}
          />
          <LessonsByDay 
            day={'Miércoles'} 
            dates={days[2]}
            lessons={filterLessonsByDay('Miércoles')}
          />
          <LessonsByDay 
            day={'Jueves'} 
            dates={days[3]}
            lessons={filterLessonsByDay('Jueves')}
          />
          <LessonsByDay 
            day={'Viernes'} 
            dates={days[4]}
            lessons={filterLessonsByDay('Viernes')}
          />
          <LessonsByDay 
            day={'Sábado'} 
            dates={days[5]}
            lessons={filterLessonsByDay('Sábado')}
          />
        </article>
      </section>
      
      <section>

        <p>Maestros registrados</p>

        <section>
          {instructors.map(instructor => (
            <p key={instructor.name}>{instructor.name}</p>
          ))}
        </section>

      </section>
    </article>
  )
}

export {Schedule}