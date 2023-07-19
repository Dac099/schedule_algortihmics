import styles from "./Lessons.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { TrialLessonTable } from "../../TrialLessonTable";
import { TrialLessonModal } from "../../TrialLessonModal";
import { auth } from "../../../firebase/firebase_sdk";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Lessons(){
  const navigate = useNavigate();
  const { trialLessons } = React.useContext(AppContext);
  const [ lessonSelected, setLessonSelected ] = React.useState(null);
  const [ showModal, setShowModal ] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(!user){
        navigate("/signin");
      }
    });
  }, []);

  return (
    <article className={styles.lessons_container}>
      {trialLessons.map(lesson => (
        <TrialLessonTable 
          lesson={lesson}
          key={lesson.id}
          setData={setLessonSelected}
          setShowModal={setShowModal}
        />
      ))}

      {showModal &&
        <TrialLessonModal lessonSelected={lessonSelected} setShowModal={setShowModal}/>
      }

    </article>
  );
}

export {Lessons};