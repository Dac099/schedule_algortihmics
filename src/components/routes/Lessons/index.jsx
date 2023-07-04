import styles from "./Lessons.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { TrialLessonTable } from "../../TrialLessonTable";
import { TrialLessonModal } from "../../TrialLessonModal";

function Lessons(){
  const { trialLessons } = React.useContext(AppContext);
  const [ lessonSelected, setLessonSelected ] = React.useState(null);
  const [ showModal, setShowModal ] = React.useState(false);

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
        <TrialLessonModal lessonSelected={lessonSelected}/>
      }

    </article>
  );
}

export {Lessons};