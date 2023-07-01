import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";


function TrialLessonTable({lesson}){
  const date = new Date(lesson.date.day.seconds * 1000).toLocaleDateString();
  const hours_lenght = lesson.date.hours.length;
  const begin_hour = lesson.date.hours[0];
  const end_hour = lesson.date.hours[hours_lenght - 1];

  return (
    <table>
      <tbody>
        <tr>
          <td><AiFillEdit /></td>
          <td>{lesson.lesson}</td>
          <td><MdDelete /></td>
        </tr>
        <tr>
          <td>Fecha</td>
          <td colSpan="2">{date}</td>
        </tr>
        <tr>
          <td>Horario</td>
          <td colSpan="2">{`${begin_hour} - ${end_hour}`}</td>      
        </tr>
        <tr>
          <td>Modo</td>
          <td colSpan="2">{lesson.isOnline ? "Línea" : "Presencial"}</td>
        </tr>
        <tr>
          <td>Tutor</td>
          <td colSpan="2">{lesson.parent_name}</td>
        </tr>
        <tr>
          <td>Contacto</td>
          <td colSpan="2">{lesson.parent_phone}</td>
        </tr>
        <tr>
          <td colSpan="3">Niños</td>
        </tr>
        <tr>
          {lesson.children.map(child => (
            <td key={child}>{child}</td>
          ))}      
        </tr>    
      </tbody>  
    </table>
  );
}

export {TrialLessonTable};