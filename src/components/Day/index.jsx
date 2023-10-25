/* eslint-disable react/prop-types */
import styles from "./Day.module.css";
import { useContext, useState, useEffect } from "react";
import { LessonsContext } from "../../Context/Lessons";
import { AppContext } from "../../Context/AppData";
import { transformStringDate } from "../../utils/transformStringDate";

function Day({date, lessons}){
  const {setShowModal, setLessonsData, setTrialLessonsData} = useContext(LessonsContext);
  const { trialLessons } = useContext(AppContext);
  const [ trialFilteredLessons, setTrialFilteredLessons ] = useState([]);
  const [ day, setDay ] = useState('');
  const [ dayNumber, setDayNumber ] = useState('');

  useEffect(() => {
    setDay(`${date.split(' ')[1]} ${date.split(' ')[2]}`);
    setDayNumber(date.split(' ')[2]);

    setTrialFilteredLessons(trialLessons.filter(lesson => {
      const current_date = new Date(date).toISOString().split('T')[0];
      const lesson_date = transformStringDate(lesson.date).date_for_input;
      return current_date === lesson_date;
    }));

  }, []);

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
        setLessonsData(lessons);
        setTrialLessonsData(trialFilteredLessons);
        setShowModal(true);
      }}
    >
      
      <p 
        className={trialFilteredLessons.length > 0 ? `${styles.date} ${styles.active}` : styles.date}
      >
        {day}
      </p>

      <p 
        className={trialFilteredLessons.length > 0 ? `${styles.date_number} ${styles.active}` : styles.date_number}
      >
        {dayNumber}
      </p>

      <section className={styles.data_lessons}>

        <p>
          <span>{lessons.length}</span> Clases Regulares
        </p>

        <p>
          <span
            className={trialFilteredLessons.length > 0 ? styles.trialLessons : ''}
          >
            {trialFilteredLessons.length}
          </span> Clases muestra
        </p>

      </section>
    </section>
  );
}

export {Day};