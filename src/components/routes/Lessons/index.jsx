import styles from "./Lessons.module.css";
import React from "react";
import { AppContext } from "../../../Context/AppData";
import { TrialLessonTable } from "../../TrialLessonTable";

function Lessons(){
  const { trialLessons } = React.useContext(AppContext);

  return (
    <>
      {trialLessons.map(lesson => (
        <TrialLessonTable 
          lesson={lesson}
          key={lesson.id}
        />
      ))}
    </>
  );
}

export {Lessons};