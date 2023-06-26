import styles from "./Instructors.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { Loading } from "../../../Loading";
import { Error } from "../../Error";
import { InstructorProfile } from "../../InstructorProfile";
import { AiFillEdit } from "react-icons/ai";
import { InstructorsModal } from "../../InstructorsModal";
import { InstructorForm } from "../../InstructorForm";
import { LessonForm } from "../../LessonForm";

function Instructors(){
  const { 
    instructors, 
    lessons, 
    isLoading, 
    onError,
    setFetchData 
  } = React.useContext(AppContext);
  const [ instructorSelected, setInstructorSelected ] = React.useState('');
  const [instructorLessons, setInstructorLessons] = React.useState([]);
  const [ showModal, setShowModal ] = React.useState(false);
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
            setModalMode('instructors')
            setShowModal(true);            
          }}
        >
          Agregar maestro
        </button>

        {instructors.map(instructor => (
          <InstructorProfile 
            key={instructor.phone}
            data={instructor}
            action={setInstructorSelected}
            onEdit={true}
            setInstructorData={setInstructorData}
            setShowModal={setShowModal}
            setModalMode={setModalMode}
          />
        ))}
      </section>

      <section className={styles.container__lessons}>

        {instructorSelected !== '' &&
          <button 
            type="button"
            className={styles.add_btn}
            onClick={() => {
              setModalMode('lessons')
              setShowModal(true);
            }}
          >
            Aregar clase
          </button>
        }

        {instructorSelected !== '' && instructorLessons.map((lesson, index) => (
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
                <AiFillEdit 
                  className={styles.edit_btn}
                  onClick={() => {
                    setLessonData(lesson);
                    setModalMode('lessons');
                    setShowModal(true);                    
                  }}
                />
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </section>
      
      {
        showModal && 
        modalMode === 'instructors' &&
        <InstructorsModal>
          <InstructorForm 
            setShowModal={setShowModal} 
            data={instructorData} 
            setFetchData={setFetchData}
            setInstructorSelected={setInstructorSelected}
            setInstructorData={setInstructorData}
          />
        </InstructorsModal>
      }

      {
        showModal &&
        modalMode === 'lessons' &&
        <InstructorsModal>
          <LessonForm 
            setShowModal={setShowModal} 
            data={lessonData} 
            instructor_name={instructorSelected} 
            setData={setLessonData}
            setFetchData={setFetchData}  
            setInstructorSelected={setInstructorSelected}
          />
        </InstructorsModal>
      }

    </article>
  );
}

export {Instructors};