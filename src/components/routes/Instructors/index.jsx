import styles from "./Instructors.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { Loading } from "../../../Loading";
import { Error } from "../../Error";
import { InstructorProfile } from "../../InstructorProfile";
import { InstructorsModal } from "../../InstructorsModal";
import { InstructorForm } from "../../InstructorForm";
import { LessonForm } from "../../LessonForm";
import { LessonTable } from "../../LessonTable";
import { auth } from "../../../firebase/firebase_sdk";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Instructors(){
  const navigate = useNavigate();
  const { 
    instructors, 
    lessons, 
    isLoading, 
    onError,
    setFetchData,
  } = React.useContext(AppContext);
  const [ instructorSelected, setInstructorSelected ] = React.useState('');
  const [instructorLessons, setInstructorLessons] = React.useState([]);
  const [ showModal, setShowModal ] = React.useState(false);
  const [ instructorData, setInstructorData ] = React.useState(null);
  const [ lessonData, setLessonData ] = React.useState(null);
  const [ modalMode, setModalMode ] = React.useState(null);
  let lessonsWithoutInstructor = [...lessons.filter(lessons => lessons.instructor === '')];


  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(!user){
        navigate("/signin");
      }
    });

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

        <button 
          type="button"
          className={`${styles.add_instructor__btn} ${styles.no_intructor__btn}`}
          onClick={() => {
            setInstructorSelected('')
          }}
        >
          Clases sin maestro
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

      <section className={
          instructorSelected === ''
          ? styles.container__lessons_no_intructor
          : styles.container__lessons
        }>

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

        {instructorSelected === '' &&
          <>
            <p className={styles.title}>Clases sin instructor asignado</p>
            <article
              className={styles.lessons}
            >
              {lessonsWithoutInstructor.map((lesson, index) => (
                <LessonTable 
                lesson={lesson}
                key={index}
                setLessonData={setLessonData}
                setModalMode={setModalMode}
                setShowModal={setShowModal}
              />
              ))}
            </article>
          </>          
        }

        {instructorSelected !== '' && instructorLessons.map((lesson, index) => (
          <LessonTable 
            lesson={lesson}
            key={index}
            setLessonData={setLessonData}
            setModalMode={setModalMode}
            setShowModal={setShowModal}
          />
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