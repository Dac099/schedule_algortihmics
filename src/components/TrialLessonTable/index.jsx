import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import styles from "./TrialLessonTable.module.css";


function TrialLessonTable({lesson, setData, setShowModal}){
  const date = new Date(lesson.date.day.seconds * 1000).toLocaleDateString();
  const hours_lenght = lesson.date.hours.length;
  const begin_hour = lesson.date.hours[0];
  const end_hour = lesson.date.hours[hours_lenght - 1];

  return (
    <table className={styles.lesson_card}>
      <tbody>
        <tr className={styles.lesson_card__title}>
          <td
            onClick={() => {
              setData(lesson);
              setShowModal(true);
            }}
          >
            <AiFillEdit />
          </td>
          <td>{lesson.lesson}</td>
          <td><MdDelete /></td>
        </tr>
        <tr>
          <td>Fecha</td>
          <td colSpan={2}>{date}</td>
        </tr>
        <tr>
          <td>Horario</td>
          <td colSpan={2}>{`${begin_hour} - ${end_hour}`}</td>      
        </tr>
        <tr>
          <td>Modo</td>
          <td colSpan={2}>{lesson.modality === 'online' ? "Línea" : 'Presencial'}</td>
        </tr>
        <tr>
          <td>Tutor</td>
          <td colSpan={2}>{lesson.parent_name}</td>
        </tr>
        <tr>
          <td>Contacto</td>
          <td colSpan={2}>{lesson.parent_phone}</td>
        </tr>
        <tr className={styles.children_row}>
          <td colSpan="3">Niños</td>
        </tr>
        <tr>
          {lesson.children.map(child => (
            <td 
              key={child}
              colSpan={3}
              className={styles.child_row}
            >
              {child}
            </td>
          ))}      
        </tr>    
      </tbody>  
    </table>
  );
}

export {TrialLessonTable};