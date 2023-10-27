import React from "react";
import styles from "./DaysOff.module.css";
import { auth } from "../../../firebase/firebase_sdk";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppData";
import { TiDelete } from "react-icons/ti";
import { addDayOff, deleteDayOff } from "../../../firebase/firestore";
import { transformDateToString } from "../../../utils/transformDateToString";
import swal from "sweetalert";

function DaysOff(){
  const navigate = useNavigate();
  const { daysOff, setFetchData, fetchData } = React.useContext(AppContext);
  const [ newDate, setNewDate ] = React.useState('');
  const [ emptyField, setEmptyField ] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(!user){
        navigate("/signin");
      }
    })
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    if(newDate === ''){
      setEmptyField(true);
      return;
    }

    const string_date = transformDateToString(newDate);
    
    addDayOff(string_date);
    setFetchData(!fetchData);
    
    swal({
      title: "Día agregado",
      text: `El ${string_date} ya no se podrán agendar clases muestra`,
      icon: 'success',
    }).then(value => {
      setNewDate('');
    })
  }

  function handleDelete(day){
    deleteDayOff(day.id);
    setFetchData(!fetchData);
    swal({
      title: "Día eliminado",
      text: `El ${day.day} queda disponible para clases muestra`,
      icon: 'success'
    })
  }

  return(
    <article className={styles.container}>

      <section className={styles.container__calendar}>
        <h2>Selecciona el día que no se agendarán clases muestra</h2>
        <p>Por defecto todos los Domingos no están disponibles</p>
        <form
          onSubmit={e => handleSubmit(e)}
          className={styles.form_date}
        >
          <div>
            <input 
              type="date" 
              name="date" 
              id="date" 
              onChange={e => {
                setNewDate(e.target.value);
                setEmptyField(false);
              }}
              value={newDate}
              className={emptyField ? styles.input_empty: ''}
            />
            {emptyField && <p className={styles.empty_error}>El campo de la fecha debe llenarse</p>}
          </div>

          <button 
            type="submit"
          >
            Agregar día
          </button>
        </form>
      </section>

      <section className={styles.container__days}>
        <h2>Días que no hay clases</h2>
        <ul className={styles.container__day_cards}>
          {daysOff.map(day => (
            <div 
              key={day.id}
              className={styles.day_card}
            >
              <p>{day.day}</p>
              <TiDelete 
                className={styles.delete_btn}
                onClick={() => handleDelete(day)}
              />
            </div>
          ))}
        </ul>
      </section>      

    </article>
  );
}

export {DaysOff};