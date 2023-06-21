import styles from "./Instructors.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { Loading } from "../../../Loading";
import { Error } from "../../Error";
import { InstructorProfile } from "../../InstructorProfile";

function Instructors(){
  const { 
    instructors, 
    lessons, 
    isLoading, 
    onError 
  } = React.useContext(AppContext);
  const [ instructorSelected, setInstructorSelected ] = React.useState('');
  const [instructorLessons, setInstructorLessons] = React.useState([]);

  React.useEffect(() => {

    if(instructorSelected !== ''){
      setInstructorLessons(
        lessons.filter(lesson => lesson.instructor === instructorSelected)
      );
    }
  }, [instructorSelected]);

  if(isLoading){
    return <Loading />
  }

  if(onError){
    return <Error msg="Obtuvimos un problema al cargar los datos."/>
  }

  return (
    <article className={styles.container}>

      <section className={styles.container__instructors}>
        {instructors.map(instructor => (
          <InstructorProfile 
            instructor_name={instructor.name}
            instructor_phone={instructor.phone}
            key={instructor.phone}
            action={setInstructorSelected}
          />
        ))}
      </section>

      <section className={styles.container__lessons}>
        {/* Listar las clases para cada instructor al que se le da click */}
        <button type="button">Aregar clase</button>
        {instructorLessons.map((lesson, index) => (
          <table 
            key={index}
            className={styles.container__lesson_card}
          >
            <tbody>
              <tr>
                <td>Clase</td>
                <td>{lesson.lesson_name}</td>
              </tr>

              <tr>
                <td>Horario</td>
                <dt>{`${lesson.hours[0]} : ${lesson.hours[lesson.hours.length - 1]}`}</dt>
              </tr>

              <tr>
                <td>Día</td>
                <td>{lesson.day}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </section>

    </article>
  );
}

export {Instructors};