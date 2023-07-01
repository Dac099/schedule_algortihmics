import styles from "./LessonForm.module.css";
import React from "react";
import swal from "sweetalert";
import { MdDelete } from "react-icons/md";
import { addLesson, deleteLesson } from "../../firebase/firestore";
import { createHoursArray } from "../../utils/createHoursArray";

function LessonForm({
  setShowModal, 
  data, 
  instructor_name, 
  setData, 
  setFetchData,
  setInstructorSelected
}){
  const [ lessonData, setLessonData ] = React.useState({
    day: '',
    hours: ['00:00', '00:00', '00:00', '00:00',],
    instructor: '',
    lesson_name: '',
    id: ''
  });

  const [ startHour, setStartHour ] = React.useState("00:00");
  const [ endHour, setEndHour ] = React.useState("00:00");
  
  const avilableHours = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00'
  ];

  React.useEffect(() => {
    if(data){
      setLessonData(data);
      setStartHour(data.hours[0]);
      setEndHour(data.hours[data.hours.length - 1]);
    }else{
      setLessonData({
        ...lessonData,
        instructor: instructor_name
      })
    } 
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    const schedule  = createHoursArray(startHour, endHour);

    const new_lesson_data = {
      ...lessonData,
      hours: schedule      
    };

    console.log(new_lesson_data);    

    addLesson(new_lesson_data);
    setData(null);

    swal(
      'Clase agregada correctamente',
      '',
      'success'
    ).then(value => clearData());
  }

  function handleDelete(lesson_id){
    deleteLesson(lesson_id);
    swal(
      'Lección eliminada',
      '',
      'success'
    ).then(data => clearData());
  }

  function clearData(){
    setShowModal(false);
    setData(null);
    setInstructorSelected('');
    setFetchData(prevState => !prevState);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.lesson_form}
    >
      <div>
        <label htmlFor="day">Día de la clase</label>
        <input 
          type="text" 
          name="day" 
          id="day" 
          onChange={(e) => setLessonData({
            ...lessonData, 
            day: e.target.value
          })}
          value={lessonData.day}
        />
      </div>

      <div>
        <label htmlFor="instructor">Nombre del instructor</label>
        <input 
          type="text" 
          name="instructor" 
          id="instructor" 
          onChange={(e) => setLessonData({
            ...lessonData,
            instructor: e.target.value
          })}
          value={lessonData.instructor}
        />
      </div>

      <div>
        <label htmlFor="lesson">Nombre de la clase</label>
        <input 
          type="text" 
          name="lesson" 
          id="lesson" 
          onChange={e => setLessonData({
            ...lessonData,
            lesson_name: e.target.value
          })}
          value={lessonData.lesson_name}
        />
      </div>

      <div className={styles.input_hours}>

        <div>          
          <label htmlFor="start_hour">Hora de inicio</label>
          <select 
            name="end_hour" 
            id="end_hour"
            onChange={e => setStartHour(e.target.value)}
            value={startHour}
          >
            {avilableHours.map(hour => (
              <option value={hour} key={hour}>{hour}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="end_hour">Hora final</label>
          <select 
            name="end_hour" 
            id="end_hour"
            onChange={e => setEndHour(e.target.value)}
            value={endHour}
          >
            {avilableHours.map(hour => (
              <option value={hour} key={hour}>{hour}</option>
            ))}
          </select>
        </div>

      </div>

      <div 
        className={!data ? styles.action_btns : styles.action_btns__delete}
      >
        {data && <MdDelete 
          onClick={() => handleDelete(data.id)}
          className={styles.delete_btn}
          />
        }
        <button 
          type="button"
          onClick={() => {
            setShowModal(false);
            setData(null);
          }}
          className={styles.cancel_btn}
        >
          Cancelar
        </button>

        <button 
          type="submit"
          className={styles.submit_btn}
        >
          Agregar clase
        </button>
      </div>

    </form>
  );
}

export {LessonForm};