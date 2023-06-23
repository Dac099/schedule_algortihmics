import styles from "./Instructors.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { Loading } from "../../../Loading";
import { Error } from "../../Error";
import { InstructorProfile } from "../../InstructorProfile";
import { AiFillEdit } from "react-icons/ai";
import { InstructorsModal } from "../../InstructorsModal";
import { InstructorForm } from "../../InstructorForm";

function Instructors(){
  const { 
    instructors, 
    lessons, 
    isLoading, 
    onError 
  } = React.useContext(AppContext);
  const [ instructorSelected, setInstructorSelected ] = React.useState('');
  const [instructorLessons, setInstructorLessons] = React.useState([]);
  const [ showModal, setShowModal ] = React.useState(true);
  const [ instructorData, setInstructorData ] = React.useState(null);
  const [ lessonData, setLessonData ] = React.useState(null);
  const [ modalMode, setModalMode ] = React.useState(null);
 


  React.useEffect(() => {

    if(instructorSelected !== ''){
      setInstructorLessons(
        lessons.filter(lesson => lesson.instructor === instructorSelected)
      );
    }
  }, [instructorSelected]);

  if(isLoading){
    return (
      <article className={styles.loading_container}>
        <Loading />
      </article>
    );
  }

  if(onError){
    return <Error msg="Obtuvimos un problema al cargar los datos."/>
  }

  return (
    <article className={styles.container}>

      <section className={styles.container__instructors}>

        <button 
          type="button"
          className={styles.add_instructor__btn}
          onClick={() => {
            setModalMode('new-instructor')
            setShowModal(true);            
          }}
        >
          Agregar maestro
        </button>

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

        {instructorSelected !== '' &&
          <button 
            type="button"
            className={styles.add_btn}
          >
            Aregar clase
          </button>
        }

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
                <td>{`${lesson.hours[0]} : ${lesson.hours[lesson.hours.length - 1]}`}</td>
              </tr>

              <tr>
                <td>Día</td>
                <td>{lesson.day}</td>
              </tr>

              <tr>
                <td 
                  colSpan={2}
                  style={{
                    backgroundColor: "#FFD749",
                    border: "none",
                  }}
                >
                <AiFillEdit className={styles.edit_btn}/>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </section>
      
      {
        showModal && 
        modalMode === 'new-instructor' &&         
        <InstructorsModal>
          <InstructorForm setShowModal={setShowModal} data={instructorData}/>
        </InstructorsModal>
      }

    </article>
  );
}

export {Instructors};