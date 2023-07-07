import React from "react";
import swal from "sweetalert";
import styles from "./TrialLessonModal.module.css";
import { transformStringDate }  from "../../utils/transformStringDate";
import { transformDateToString } from "../../utils/transformDateToString";
import { createHoursArray } from "../../utils/createHoursArray";
import { updateTrialLesson } from "../../firebase/firestore";
import { AppContext } from "../../Context/AppData";


const avilableHours = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00'
];

function TrialLessonModal({lessonSelected, setShowModal}){
  const [ lessonUpdate, setLessonUpdate ] = React.useState(lessonSelected);
  const [ childrenAmount, setChildrenAmount ] = React.useState(lessonSelected.children.length);
  const [ childrenInputs, setChildrenInputs ] = React.useState([]);
  const [ startHour, setStartHour ] = React.useState(lessonSelected.hours[0]);
  const [ endHour, setEndHour ] = React.useState(lessonSelected.hours[lessonSelected.hours.length - 1]);
  const { setFetchData } = React.useContext(AppContext);

  React.useEffect(() => {
    const inputs = [];

    for(let i = 0; i < childrenAmount; i++){
      inputs[i] = lessonUpdate.children[i] || "";
    }
  
    setChildrenInputs(inputs);
  }, [childrenAmount]);


  function handleSubmit(e){
    e.preventDefault();
    const objectUpdated = {
      ...lessonUpdate,
      children: childrenInputs,
      hours: createHoursArray(startHour, endHour),      
    }
    
    updateTrialLesson(objectUpdated);
    
    swal({
      title: 'Clase muestra actualizada',
      text: `La lección de ${objectUpdated.parent_name} ha cambiado`,
      icon: 'success'
    }).then(value => {
      setShowModal(false);
      setFetchData(prevState => !prevState);      
    });
    
  }

  return (
    <article className={styles.trial_modal}>
      <form 
        className={styles.form_uptade}
        onSubmit={e => handleSubmit(e)}
      >
        <div>
          <label htmlFor="lesson_name">Lección</label>
          <input 
            type="text" 
            name="lesson_name" 
            id="lesson_name" 
            value={lessonUpdate.lesson}
            onChange={e => {
              setLessonUpdate({
                ...lessonUpdate,
                lesson : e.target.value
              });
            }}
          />
        </div>

        <div>
          <label htmlFor="date">Fecha</label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            value={transformStringDate(lessonUpdate.date).date_for_input}
            onChange={e => {
              setLessonUpdate({
                ...lessonUpdate,
                date : transformDateToString(e.target.value)
              })
            }}
          />
        </div>

        <div>
          <label htmlFor="hours">Horario</label>
          <div className={styles.schedule_container}>
             
            <div>
              <select 
                name="hours" 
                id="hours"
                onChange={(e) => setStartHour(e.target.value)}
                value={startHour} 
              >
                {avilableHours.map(hour => (
                  <option 
                    value={hour} 
                    key={hour}
                  >
                    {hour}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select 
                name="end" 
                id="end"
                onChange={(e) => setEndHour(e.target.value)}
                value={endHour}
              >
                {avilableHours.map(hour => (
                  <option 
                    value={hour} 
                    key={hour}
                  >
                    {hour}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        <div className={styles.modality}>
          <div>
            <label htmlFor="onplace">En línea</label>
            <input 
              type="radio" 
              name="mode" 
              id="onplace" 
              value={"online"} 
              checked={lessonUpdate.modality.toLowerCase() === 'online'}
              onChange={e => {
                setLessonUpdate({
                  ...lessonUpdate,
                  modality: e.target.value
                })
              }}
            />
          </div>
          
          <div>
            <label htmlFor="onlice">Presencial</label>
            <input 
              type="radio" 
              name="mode" 
              id="online" 
              value={"presencial"} 
              checked={lessonUpdate.modality.toLowerCase() === 'presencial'}
              onChange={e => {
                setLessonUpdate({
                  ...lessonUpdate,
                  modality: e.target.value
                })
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tutor">Tutor</label>
          <input 
            type="text" 
            name="tutor" 
            id="tutor" 
            value={lessonUpdate.parent_name}
            onChange={e => {
              setLessonUpdate({
                ...lessonUpdate,
                parent_name: e.target.value
              })
            }}
          />
        </div>

        <div>
          <label htmlFor="phone">Télefono</label>
          <input 
            type="text" 
            name="phone" 
            id="phone" 
            value={lessonUpdate.parent_phone}
            onChange={e => {
              setLessonUpdate({
                ...lessonUpdate,
                parent_phone: e.target.value
              })
            }}
          />
        </div>

        <div>
          <label htmlFor="children">Niños</label>
          <input 
            type="number" 
            name="children" 
            id="children"
            value={childrenAmount}
            onChange={(e) => setChildrenAmount(e.target.value)}
          />
        </div>

        <div>
          {childrenInputs.map((childName, index) => (
            <input 
              type="text" 
              value={childName} 
              key={index}
              onChange={e => {
                const inputs = [...childrenInputs];
                inputs[index] = e.target.value;
                setChildrenInputs(inputs);
              }}
            />
          ))}
        </div>

        <div className={styles.btns}>
          <button 
            onClick={() => setShowModal(false)}
            className={styles.cancel_btn}
          >
            Cancelar
          </button>

          <button 
            type="submit"
            className={styles.submit_btn}
          >
            Actualizar
          </button>
        </div>

      </form>
    </article>
  );
}

export {TrialLessonModal};