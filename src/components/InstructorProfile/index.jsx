import { HiUserCircle } from "react-icons/hi2";
import styles from "./InstructorProfile.module.css";
import uniqolor from 'uniqolor';

function InstructorProfile({instructor_name}){

  return (
    <article className={styles.instructor_card}>
      <HiUserCircle 
        style={{
          color: uniqolor.random().color
        }}
      />
      <p>{instructor_name}</p>
    </article>
  );
}

export {InstructorProfile};