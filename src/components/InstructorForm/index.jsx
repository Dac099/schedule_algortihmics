import React from "react";
import { addInstructor } from "../../firebase/firestore.js";
import swal from "sweetalert";
import styles from "./InstructorForm.module.css";

function InstructorForm({data, setShowModal}){
  const [instructorData, setInstructorData ] = React.useState({
    name: '',
    phone: '',
  });

  React.useEffect(() => {
    if(data !== null){
      setInstructorData({
        name: data.name,
        phone: data.phone
      })
    }
  }, []);


  function handleSubmit(e){
    e.preventDefault();
    addInstructor(instructorData);
    swal(
      'Instructor agregado correctamente', 
      `${instructorData.name} agregado`,
      'success'
    ).then(value => setShowModal(false))

  }

  return(
    <form 
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
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

export {InstructorForm};