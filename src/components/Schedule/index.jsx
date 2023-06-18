import styles from './Schedule.module.css';
import { getDaysByMonth } from "../../utils/getDays";
import { useEffect, useState } from "react";
import { DayWeek } from "../DayWeek";
import { getMonth } from "../../utils/transformDates";
import { 
  getAllLessons,
  getAllInstructors, 
} from "../../firebase/firestore";
import { InstructorProfile } from '../InstructorProfile';

function Schedule(){
  const month = new Date().getMonth();
  const year = new Date().getFullYear();  
  const days = Object.values(getDaysByMonth(month + 1, year));
  const [lessons, setLessons] = useState();
  const [instructors, setInstructors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [onError, setOnError] = useState(false);
  const [firstDayMonthReference, setFirstDayMonthReference] = useState(0);

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

    //Recorrer el arreglo days
    //Obtener el primer elemento de sus arreglos
    //Otener la fecha que es menor
    //De la fecha menor obtener su dia y asignarla en firstDayMonthReference
    const firstElements = days.map(day => day[0]);
    const firstDate = firstElements.filter(element => new Date(element).getDate() === 1);
  
    setFirstDayMonthReference(new Date(firstDate).getDay())
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
    <article className={styles.calendar_container}>
      <section>
        <p
          className={styles.section_title}
        >
          {`${getMonth(month)} ${year}`}
        </p>
        <article className={styles.calendar_week}>
          <DayWeek 
            day={'Lunes'}  
            dates={days[0]}
            lessons={filterLessonsByDay('Lunes')}
            dayMonth={1}
            dayReference={firstDayMonthReference}
          />
          <DayWeek 
            day={'Martes'} 
            dates={days[1]}
            lessons={filterLessonsByDay('Martes')}
            dayMonth={2}
            dayReference={firstDayMonthReference}
          />
          <DayWeek 
            day={'Miércoles'} 
            dates={days[2]}
            lessons={filterLessonsByDay('Miércoles')}
            dayMonth={3}
            dayReference={firstDayMonthReference}
          />
          <DayWeek 
            day={'Jueves'} 
            dates={days[3]}
            lessons={filterLessonsByDay('Jueves')}
            dayMonth={4}
            dayReference={firstDayMonthReference}
          />
          <DayWeek 
            day={'Viernes'} 
            dates={days[4]}
            lessons={filterLessonsByDay('Viernes')}
            dayMonth={5}
            dayReference={firstDayMonthReference}
          />
          <DayWeek 
            day={'Sábado'} 
            dates={days[5]}
            lessons={filterLessonsByDay('Sábado')}
            dayMonth={6}
            dayReference={firstDayMonthReference}
          />
        </article>
      </section>
      
      <section>

        <p
          className={styles.section_title}
        >
          Maestros 
        </p>

        <section>
          {instructors.map(instructor => (
            <InstructorProfile 
              instructor_name={instructor.name}
              key={instructor.name}
            />
          ))}
        </section>

      </section>
    </article>
  )
}

export {Schedule}