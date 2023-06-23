import styles from "./LessonForm.module.css";
import React from "react";
import swal from "sweetalert";

function LessonForm({setShowModal, data, instructor_name}){
  const [ lessonData, setLessonData ] = React.useState({
    day: '',
    hours: ['00:00', '00:00', '00:00', '00:00',],
    instructor: '',
    lesson_name: '',
  });

  const [ startHour, setStartHour ] = React.useState("00:00");
  const [ endHour, setEndHour ] = React.useState("00:00");

  React.useEffect(() => {
    if(data){
      setLessonData(data);
    }else{
      setLessonData({
        ...lessonData,
        instructor: instructor_name
      })
    } 
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    let hours  = [];
    hours = lessonData.hours.splice(0, 1, startHour);
    hours = lessonData.hours.splice(lessonData.hours,length - 1, 1, endHour);

    setLessonData({
      ...lessonData,
      hours: hours
    });

    console.log(lessonData);

    swal(
      'Clase agregada correctamente',
      '',
      'success'
    ).then(value => setShowModal(false))
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
          <input 
            type="text" 
            name="start_hour" 
            id="start_hour" 
            placeholder="00:00"
            onChange={e => setStartHour(e.target.value)}
            value={startHour}
          />
        </div>

        <div>
          <label htmlFor="end_hour">Hora final</label>
          <input 
            type="text" 
            name="end_hour" 
            id="end_hour" 
            placeholder="00:00"
            onChange={e => setEndHour(e.target.value)}
            value={endHour}
          />
        </div>

      </div>

      <div className={styles.action_btns}>
        <button 
          type="button"
          onClick={() => setShowModal(false)}
        >
          Cancelar
        </button>
        <button 
          type="submit"
        >
          Agregar clase
        </button>
      </div>

    </form>
  );
}

export {LessonForm};