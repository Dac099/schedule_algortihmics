import { AiFillEdit } from "react-icons/ai";
import styles from "./LessonTable.module.css";

function LessonTable({
  lesson, 
  setLessonData, 
  setModalMode, 
  setShowModal
}) {
  return (
    <table 
      className={styles.container__lesson_card}
    >
      <tbody>
        <tr>
          <td>Clase</td>
          <td>{lesson.lesson_name}</td>
        </tr>

        <tr>
          <td>Horario</td>
          <td>{`${lesson.hours[0]} : ${lesson.hours[lesson.hours.length - 1]}`}</td>
        </tr>

        <tr>
          <td>Día</td>
          <td>{lesson.day}</td>
        </tr>

        <tr>
          <td 
            colSpan={2}
            style={{
              backgroundColor: "#FFD749",
              border: "none",
            }}
          >
          <AiFillEdit 
            className={styles.edit_btn}
            onClick={() => {
              setLessonData(lesson);
              setModalMode('lessons');
              setShowModal(true);                    
            }}
          />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export {LessonTable};