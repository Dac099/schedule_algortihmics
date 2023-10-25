import styles from './Schedule.module.css';
import { getDaysByMonth } from "../../utils/getDays";
import { useEffect, useState, useContext } from "react";
import { DayWeek } from "../DayWeek";
import { getMonth } from "../../utils/transformDates";
import { InstructorProfile } from '../InstructorProfile';
import { LessonsContext } from '../../Context/Lessons';
import { AppContext } from "../../Context/AppData";
import { LessonsModal } from "../LessonsModal/index"
import { Loading } from '../../Loading';
import { Error } from '../Error';

function Schedule(){
  const month = new Date().getMonth();
  const year = new Date().getFullYear();  
  const days = Object.values(getDaysByMonth(month + 1, year));
  const [firstDayMonthReference, setFirstDayMonthReference] = useState(0);
  const {showModal} = useContext(LessonsContext);
  const {
    lessons,
    instructors,
    isLoading,
    onError
  } = useContext(AppContext);

  useEffect(() => {
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

  if(isLoading){
    return (
      <article className={styles.loader_container}>
        <Loading />
      </article>
    );
  }

  if(onError){
    return (
      <Error msg="Error al obtener los datos, intentalo mas tarde."/>
    );
  }

  return (
    <article className={styles.calendar_container}>
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

      <section className={styles.instructors_section}>

        <p
          className={styles.section_title}
        >
          Maestros 
        </p>

        <section className={styles.instructors_container}>
          {instructors.map(instructor => (
            <InstructorProfile 
              key={instructor.name}
              data={instructor}
              onEdit={false}
            />
          ))}
        </section>

      </section>
      {showModal && <LessonsModal />}
    </article>
  )
}

export {Schedule}