import React from "react";
import { addInstructor, deleteInstructor } from "../../firebase/firestore.js";
import swal from "sweetalert";
import styles from "./InstructorForm.module.css";

function InstructorForm({
  data, 
  setShowModal, 
  setFetchData,
  setInstructorSelected,
  setInstructorData
}){
  const [localData, setLocalData ] = React.useState({
    name: '',
    phone: '',
  });

  React.useEffect(() => {
    if(data){
      setLocalData(data)
    }
  }, []);


  function handleSubmit(e){
    e.preventDefault();
    addInstructor(localData);
    swal(
      'Instructor agregado correctamente', 
      `${localData.name} agregado`,
      'success'
    ).then(value => {
      setShowModal(false);
      setInstructorSelected('');
      setFetchData(prevState => !prevState);
    })

  }

  function handleEditInstructor(id){
    deleteInstructor(id);
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
          onChange={(e) => setLocalData({
            ...localData,
            name: e.target.value
          })}
          value={localData.name}
        />
      </div>

      <div>
        <label htmlFor="instructor_phone">Número de télefono</label>
        <input 
          type="tel" 
          name="instructor_phone" 
          id="instructor_phone"
          onChange={(e) => setLocalData({
            ...localData,
            phone: e.target.value
          })}
          value={localData.phone}
        />
      </div>

      <div className={styles.action_btns}>
        <button 
          type="button"
          onClick={() => {
            setInstructorData(null);
            setShowModal(false);
          }}
          className={styles.cancel_btn}
        >
          Cancelar
        </button>

        <button 
          type="submit"
          className={styles.submit_btn}
        >
          Agregar profesor
        </button>      
      </div>

    </form>
  );
}

export {InstructorForm};