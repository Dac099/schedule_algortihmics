import React from "react";
import styles from "./TrialLessonModal.module.css";


const avilableHours = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00'
];

function TrialLessonModal({lessonSelected}){
  const [ lessonUpdate, setLessonUpdate ] = React.useState(lessonSelected);
  const [ childrenAmount, setChildrenAmount ] = React.useState(lessonSelected.children.length);
  const [ childrenName, setChildrenName ] = React.useState([]);

  React.useEffect(() => {
    const inputs = [];
    //Llenar el arreglo con los el total de inputs, marcados por childrenAmount
    //por cada niño registrado en lesson, cambiar el atributo value de los inputs
    for(let i = 0; i < childrenAmount; i++){
      inputs.push("");
    }

    for(let i = 0; i < lessonUpdate.children.length; i++){
      inputs[i] = lessonUpdate.children[i];
    }
  
    console.log(inputs)
    setChildrenName(inputs);
  }, [childrenAmount]);


  return (
    <article className={styles.trial_modal}>
      <form className={styles.form_uptade}>
        <div>
          <label htmlFor="lesson_name">Lección</label>
          <input 
            type="text" 
            name="lesson_name" 
            id="lesson_name" 
            value={lessonUpdate.lesson}
          />
        </div>

        <div>
          <label htmlFor="date">Fecha</label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            value={secondsToDate(lessonUpdate.date.day.seconds)}
          />
        </div>

        <div>
          <label htmlFor="hours">Horario</label>
          <div>
             
            <div>
              <select 
                name="hours" 
                id="hours"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                value={lessonUpdate.date.hours[0]} 
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
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                value={lessonUpdate.date.hours.slice(-1)}
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

        <div>
          <label htmlFor="onplace">Presencial</label>
          <input 
            type="radio" 
            name="mode" 
            id="onplace" 
            value={"online"} 
            checked={!lessonUpdate.isOnline}
          />

          <label htmlFor="onlice">En línea</label>
          <input 
            type="radio" 
            name="mode" 
            id="online" 
            value={"onplace"} 
            checked={lessonUpdate.isOnline}
          />
        </div>

        <div>
          <label htmlFor="tutor">Tutor</label>
          <input 
            type="text" 
            name="tutor" 
            id="tutor" 
            value={lessonUpdate.parent_name}
          />
        </div>

        <div>
          <label htmlFor="phone">Télefono</label>
          <input 
            type="text" 
            name="phone" 
            id="phone" 
            value={lessonUpdate.parent_phone}
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
          {childrenName.map((childName, index) => (
            <input type="text" value={childName} key={index}/>
          ))}
        </div>

      </form>
    </article>
  );
}

function secondsToDate(seconds){
  return new Date(seconds * 1000).toISOString().split('T')[0];
}

export {TrialLessonModal};