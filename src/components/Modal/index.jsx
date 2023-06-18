import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({children}){

  return createPortal(
    <article 
      className={styles.modal_container}
    >
      {children}
    </article>,
    document.getElementById('modal')
  );
}

export {Modal};