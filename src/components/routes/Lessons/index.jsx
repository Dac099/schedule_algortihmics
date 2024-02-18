import styles from "./Lessons.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { TrialLessonTable } from "../../TrialLessonTable";
import { TrialLessonModal } from "../../TrialLessonModal";
import { auth } from "../../../firebase/firebase_sdk";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Loading";
import { Error } from "../../Error";
import { HourSetter } from "../../HoursSetter";

function Lessons(){
  const navigate = useNavigate();
  const { trialLessons, isLoading, onError } = React.useContext(AppContext);
  const [ lessonSelected, setLessonSelected ] = React.useState(null);
  const [ showModal, setShowModal ] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(!user){
        navigate("/signin");
      }
    });
  }, []);


  if(isLoading){
    return (
      <article className={styles.loading_container}>
        <Loading />
      </article>
    );
  }

  if(onError) return <Error msg={'Intentalo más tarde'}/>;

  if(trialLessons.length < 1){
    return (
      <section>

        <HourSetter />

        <article className={styles.empty_lessons}>
          <h2>Aún no hay clases muestra</h2>
        </article>
      </section>
    );
  }

  return (
    <section>

      <HourSetter />

      <article className={styles.lessons_container}>
        {trialLessons.map(lesson => (
          <TrialLessonTable 
            key={lesson.id}
            lesson={lesson}
            setData={setLessonSelected}
            setShowModal={setShowModal}
          />
        ))}

        {showModal &&
          <TrialLessonModal lessonSelected={lessonSelected} setShowModal={setShowModal}/>
        }

      </article>
    </section>
  );
}

export {Lessons};