import { HiUserCircle } from "react-icons/hi2";
import styles from "./InstructorProfile.module.css";
import uniqolor from 'uniqolor';

function InstructorProfile({instructor_name, instructor_phone, action}){

  function handleClick(){
    if(action){
      action(instructor_name);
    }
  }

  return (
    <article 
      className={instructor_phone 
        ? `${styles.instructor_card} ${styles.instructor_card__hover}`
        : styles.instructor_card
      }
      onClick={handleClick}
      style={instructor_phone 
        ? {cursor:"pointer"} 
        : {cursor:"default"}
      }
    >

      <HiUserCircle 
        style={{
          color: uniqolor.random().color
        }}
      />

      <section>
        <p 
          id="name"
          datatype={instructor_name}
        >
          {instructor_name}
        </p>

        {instructor_phone && 
          <p 
            className={styles.phone}
          >
            {instructor_phone}
          </p>
        }
      </section>

    </article>
  );
}

export {InstructorProfile};