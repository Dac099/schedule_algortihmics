import styles from './HourSetter.module.css';
import React from 'react';
import { AppContext } from '../../Context/AppData';
import { defineHoursDB } from '../../firebase/firestore';
import swal from 'sweetalert';

export function HourSetter(){
  const { dbHours } = React.useContext(AppContext);
  const hours = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
    "21:00"
  ];
  const [ startHour, setStartHour ] = React.useState(dbHours.startHour);
  const [ endHour, setEndHour ] = React.useState(dbHours.endHour);

  const setHoursDB = async() => {
    if(hours.includes(startHour) && hours.includes(endHour)){
      await defineHoursDB(startHour, endHour);
      swal({
        title: 'Horario actualizado',
        icon: 'success'
      });
    }
  }


  return (
    <article className={styles.container}>
      <p>Establece el horario de atención</p>

      <section className={styles.selects}>
        <select 
          name="start-hour" 
          id="start-hour"
          value={startHour || ""}
          onChange={e => setStartHour(e.target.value)}
        >
          <option value="">Hora de inicio</option>
          {endHour
            ?
              hours.slice(0, hours.findIndex(h => h == endHour)).map((hour, index) => (
                <option value={hour} key={index}>{hour}</option>
              ))
            :
              hours.map((hour, index) => (
                <option value={hour} key={index}>{hour}</option>
              ))
          }
        </select>

        <select 
          name="end-hour" 
          id="end-hour"
          value={endHour || "Hora final"}
          onChange={e => setEndHour(e.target.value)}
        >
          <option value="">Hora final</option>
          {startHour
            ?
              hours.slice(hours.findIndex(h => h == startHour) + 1).map((hour, index) => (
                <option value={hour} key={index}>{hour}</option>
              ))
            :
              hours.map((hour, index) => (
                <option value={hour} key={index}>{hour}</option>
              ))
          }
        </select>

        <button 
          type="button"
          onClick={setHoursDB}
        >
          Guardar
        </button>
      </section>
    </article>
  );
}