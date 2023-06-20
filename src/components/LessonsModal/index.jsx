import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useContext } from "react";
import { LessonsContext } from "../../Context/Lessons";


function LessonsModal(){
  const {setShowModal, lessonsData} = useContext(LessonsContext);

  return createPortal(
    <article 
      className={styles.modal_container}
    >
      <p
        className={styles.close_btn}
        onClick={() => setShowModal(false)}
      >
        &times;
      </p>

      <section>
        <p className={styles.title}>Clases regulares del día</p>
        <section className={styles.lessons_container}>
          {lessonsData.map((lesson, index) => (
            <table 
              key={index}
              className={styles.lesson_card}
            >
              <tbody>
                <tr>
                  <td>Clase</td>
                  <td>{lesson.lesson_name}</td>
                </tr>

                <tr>
                  <td>Horario</td>
                  <td>
                    {`${lesson.hours[0]} : ${lesson.hours[lesson.hours.length - 1]}`}
                  </td>
                </tr>

                <tr>
                  <td>Instructor</td>
                  <td>
                    {lesson.instructor}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </section>
      </section>

      <section>
        <p className={styles.title}>Clases muestra del día</p>
        <section  className={styles.lessons_container}></section>
      </section>
      
    </article>,
    document.getElementById('modal')
  );
}

export {LessonsModal};