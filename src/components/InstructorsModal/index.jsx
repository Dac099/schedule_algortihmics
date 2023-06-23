import React from "react";
import { createPortal } from "react-dom";
import styles from "./InstructorsModal.module.css";

function InstructorsModal({children}){

  return createPortal(
    <article className={styles.modal_container}>
      {children}
    </article>,
    document.getElementById('modal')
  )
}

export {InstructorsModal};