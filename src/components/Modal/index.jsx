import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useContext } from "react";
import { LessonsContext } from "../../Context/Lessons";


function Modal({content}){
  const {setShowModal} = useContext(LessonsContext);

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
      <p>{content}</p>
    </article>,
    document.getElementById('modal')
  );
}

export {Modal};