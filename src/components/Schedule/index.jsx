import styles from './Schedule.module.css';
import { getDaysByMonth } from "../../utils/getDays";
import { useEffect, useState, useContext } from "react";
import { DayWeek } from "../DayWeek";
import { getMonth } from "../../utils/transformDates";
import { InstructorProfile } from '../InstructorProfile';
import { LessonsContext } from '../../Context/Lessons';
import { Modal } from "../Modal/index"
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
  const [firstDayMonthReference, setFirstDayMonthReference] = useState(0);
  const {showModal, setShowModal} = useContext(LessonsContext);

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

    /**
     * Se recorre el arreglo de los dias para poder saber en que dia de la semana
     * empieza el mes y asi desplegar las tarjetas de dias en orden
    */
    const firstElements = days.map(day => day[0]);
    const firstDate = firstElements.filter(element => new Date(element).getDate() === 1);
  
    setFirstDayMonthReference(new Date(firstDate).getDay())
  }, []);
  
  function filterLessonsByDay(day){
    return lessons.filter(lesson => lesson.day === day);
  }
  
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

  return (
    <article className={styles.calendar_container}>
      <section className={styles.instructors_section}>

        <p
          className={styles.section_title}
        >
          Maestros 
        </p>

        <section className={styles.instructors_container}>
          {instructors.map(instructor => (
            <InstructorProfile 
              instructor_name={instructor.name}
              key={instructor.name}
            />
          ))}
        </section>

      </section>

      <section className={styles.calendar_section}>
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
      {showModal && <Modal content={'holaaa'}/>}
    </article>
  )
}

export {Schedule}