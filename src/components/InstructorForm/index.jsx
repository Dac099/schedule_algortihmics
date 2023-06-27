import React from "react";
import { 
  addInstructor, 
  deleteInstructor,
  updateInstructor 
} from "../../firebase/firestore.js";
import swal from "sweetalert";
import styles from "./InstructorForm.module.css";
import { MdDelete } from "react-icons/md";


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
      setLocalData({
        name: data.name,
        phone: data.phone
      })
    }
  }, []);


  function handleSubmit(e){
    e.preventDefault();

    if(data){
      updateInstructor(data.id, localData);
      swal(
        'Instructor actualizado correctamente',
        `${localData.name} ha sido acutalizado`,
        'success'
      ).then(value => cleanDataAndReload());
    }else{
      addInstructor(localData);
      swal(
        'Instructor agregado correctamente', 
        `${localData.name} agregado`,
        'success'
      ).then(value => cleanDataAndReload())
    }


  }

  function handleDeleteInstructor(id){
    deleteInstructor(id);
    swal(
      'Instructor eliminado correctamente',
      `${localData.name} ha sido eliminado. Sus clases siguen activas`,
      'success'
    ).then(value => cleanDataAndReload());
  }

  function cleanDataAndReload(){
    setShowModal(false);
    setInstructorData(null);
    setInstructorSelected('');
    setFetchData(prevState => !prevState);
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

      <div className={
        !data 
          ?styles.action_btns
          :styles.action_btns__delete
      }>

        {data &&
          <div
            className={styles.delete_btn}
            onClick={() => handleDeleteInstructor(data.id)}
          >
            <MdDelete />
          </div>
        }


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
          {data ? 'Actualizar' : 'Agregar'}
        </button>      
      </div>

    </form>
  );
}

export {InstructorForm};