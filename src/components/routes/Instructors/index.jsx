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
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import marsbot from '/marsbot.png';

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
  const [showLessons, setShowLessons] = React.useState(false);


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

        <p className={styles.container__instructors_title}>Instructores</p>

        <section className={styles.container__instructors_cards}>
          <button 
            type="button"
            className={styles.add_instructor__btn}
            onClick={() => {
              setModalMode('instructors')
              setShowModal(true);            
            }}
          >
            <AiOutlineUserAdd />
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

        {lessonsWithoutInstructor.length > 0 &&
          <section className={styles.container__lessons_no_instructors}>

            <div>
              <p>Lecciones sin instructor</p>

              <AiFillCaretDown 
                onClick={() => setShowLessons(!showLessons)}
                style={showLessons
                  ? {transform: 'rotateZ(180deg)'}
                  : {}
                }
              />
            </div>
            {showLessons &&
              <div className={styles.lessons_without_instructors_container}>
                {lessonsWithoutInstructor.map((lesson, index) => (
                  <LessonTable 
                    lesson={lesson}
                    key={index}
                    setLessonData={setLessonData}
                    setModalMode={setModalMode}
                    setShowModal={setShowModal}
                  />                
                ))}
              </div>
            }
          </section>
        }        
      </section>

      <section>
        {instructorSelected === ''
          ? 
            <section>
              <p className={styles.instructors_lessons__text}>Selecciona un maestro para poder ver sus clases</p>
              <img 
                src={marsbot} 
                alt="Robot marsbot" 
                className={styles.marsbot}
              />
            </section>
          : 
            <section className={styles.container__lessons}>
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
              
              {instructorLessons.map((lesson, index) => (
                  <LessonTable 
                    lesson={lesson}
                    key={index}
                    setLessonData={setLessonData}
                    setModalMode={setModalMode}
                    setShowModal={setShowModal}
                  />
              ))}
            </section>
        }
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