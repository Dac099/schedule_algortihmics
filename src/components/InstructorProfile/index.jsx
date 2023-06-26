import { HiUserCircle } from "react-icons/hi2";
import styles from "./InstructorProfile.module.css";
import uniqolor from 'uniqolor';
import { AiFillEdit } from "react-icons/ai";


function InstructorProfile({
  data,
  action,
  onEdit,
  setShowModal,
  setModalMode,
  setInstructorData,
}){

  function handleClick(){
    if(action){
      action(data.name);
    }
  }


  return (
    <article 
      className={
        onEdit 
        ? `${styles.instructor_card} ${styles.instructor_card__hover}`
        : styles.instructor_card
      }
      onClick={handleClick}
      style={
        onEdit 
        ? {cursor:"pointer"} 
        : {cursor:"default"}
      }
    >

      <HiUserCircle 
        style={{
          color: uniqolor.random().color
        }}
        className={styles.user_picture}
      />

      <section
        className={styles.user_data}
      >
        <p 
          id="name"
          className={styles.instructor_name}
        >
          {data.name}
        </p>

        {onEdit && 
          <p 
            className={styles.phone}
          >
            {data.phone}
          </p>
        }
      </section>

      <div
        className={styles.edit_btn}
      >
        <AiFillEdit
          onClick={() => {
            setModalMode('instructors');
            setInstructorData(data);
            setShowModal(true);
          }}
        />
      </div>
       

    </article>
  );
}

export {InstructorProfile};