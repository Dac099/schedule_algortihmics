import React from "react";
import styles from "./TrialLessonTable.module.css";
import swal from "sweetalert";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { AppContext } from "../../Context/AppData"
import { deleteTrialLesson } from "../../firebase/firestore";


function TrialLessonTable({lesson, setData, setShowModal}){
  const hours_lenght = lesson.hours.length;
  const begin_hour = lesson.hours[0];
  const end_hour = lesson.hours[hours_lenght - 1];
  const { setFetchData } = React.useContext(AppContext);

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
          <td
            onClick={() => {
              deleteTrialLesson(lesson);
              setFetchData(prevState => !prevState);
              swal({
                title: 'Lección eliminada',
                text: `La lección de ${lesson.parent_name} se a eliminado`,
                icon: 'success'
              });
            }}
          >
            <MdDelete />
          </td>
        </tr>
        <tr>
          <td>Fecha</td>
          <td colSpan={2}>{lesson.date}</td>
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
        {lesson.children.map(child => (
              <tr 
                key={child}
                
                className={styles.child_row}
              >
                <td colSpan={3}>{child}</td>
              </tr>
        ))}      
      </tbody>  
    </table>
  );
}

export {TrialLessonTable};