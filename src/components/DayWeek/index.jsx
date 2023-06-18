import { orderLessonsByHours } from "../../utils/orderLessonsByHours";
import styles from "./DayWeek.module.css";
import { Modal } from "../Modal";
import { useState, useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { LessonsProvider, LessonsContext } from "../../Context/Lessons";

function Day({date, lessons}){
  const {showModal, setShowModal} = useContext(LessonsContext);

  function closeModal(){
    setShowModal(false);
  }

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
      onClick={() => setShowModal(true)}
    >

      <p className={styles.date}>{date}</p>

      <section className={styles.data_lessons}>
        <p>
          <span>{lessons.length}</span> Clases Regulares
        </p>
        <p>
          <span>0</span> Clases muestra
        </p>
      </section>

      {showModal &&
        <Modal setShowModal={setShowModal} showModal={showModal}>
          <AiFillCloseCircle 
            className={styles.close_btn}
            onClick={closeModal}
          />
          Saludos interdimensionales
        </Modal>
      }

    </section>
  );
}

function DayWeek({dates, day, lessons, dayMonth, dayReference}){
  
  lessons = orderLessonsByHours(lessons);
 
  if(dayMonth < dayReference){
    dates = ['', ...dates];
  }

  return(
    <LessonsProvider>
      <article>

        <p className={styles.week_day}>{day}</p>

        <section className={styles.lessons_container}>
          {dates.map((date, index) => (          
            <Day 
              key={date}
              date={date} 
              lessons={lessons}
            />
          ))}
        </section>

      </article>
    </LessonsProvider>
  );
}

export {DayWeek};