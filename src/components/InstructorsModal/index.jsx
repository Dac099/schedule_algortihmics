import React from "react";
import { createPortal } from "react-dom";
import styles from "./InstructorsModal.module.css";
import { addInstructor } from "../../firebase/firestore.js";

function InstructorsModal({lesson_data, instructor_data, setShowModal}){

  instructor_data = true;

  return createPortal(
    <article className={styles.modal_container}>
      {lesson_data && <LessonForm data={lesson_data}/>}
      {instructor_data && <InstructorForm data={instructor_data}/>}
    </article>,
    document.getElementById('modal')
  )
}

function LessonForm({data}){
  return(
    <form >

    </form>
  );
}

function InstructorForm({data}){
  const [instructorData, setInstructorData ] = React.useState({
    name: '',
    phone: '',
  });


  function handleSubmit(e){
    e.preventDefault();

    console.log(instructorData);
  }

  return(
    <form 
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <label htmlFor="instructor_name">Nombre del instructor</label>
        <input 
          type="text" 
          name="instructor_name" 
          id="instructor_name"
          onChange={(e) => setInstructorData({
            ...instructorData,
            name: e.target.value
          })}
          value={instructorData.name}
        />
      </div>

      <div>
        <label htmlFor="instructor_phone">Número de télefono</label>
        <input 
          type="tel" 
          name="instructor_phone" 
          id="instructor_phone"
          onChange={(e) => setInstructorData({
            ...instructorData,
            phone: e.target.value
          })}
          value={instructorData.phone}
        />
      </div>

      <button 
        type="submit"
      >
        Agregar profesor
      </button>
    </form>
  );
}

export {InstructorsModal};