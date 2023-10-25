import styles from "./Day.module.css";
import { useContext, useState } from "react";
import { LessonsContext } from "../../Context/Lessons";

function Day({date, lessons}){
  const {setShowModal, setLessonsData} = useContext(LessonsContext);
  const [ day, setDay ] = useState(`${date.split(' ')[1]} ${date.split(' ')[2]}`);
  const [ dayNumber, setDayNumber ] = useState(date.split(' ')[2]);

  if(date === ''){
    return (
      <section 
        className={styles.day_card}
        style={{
          backgroundColor:'#602B7A',
          cursor: 'default'
        }}
      >      
      </section>
    );
  }

  return (
    <section 
      className={styles.day_card}
      onClick={() => {
        setLessonsData(lessons)
        setShowModal(true);
      }}
    >

      <p className={styles.date}>{day}</p>
      <p className={styles.date_number}>{dayNumber}</p>

      <section className={styles.data_lessons}>

        <p>
          <span>{lessons.length}</span> Clases Regulares
        </p>

        <p>
          <span>0</span> Clases muestra
        </p>

      </section>
    </section>
  );
}

export {Day};