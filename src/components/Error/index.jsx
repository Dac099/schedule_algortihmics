import { MdError } from "react-icons/md";
import styles from "./Error.module.css";

function Error({msg}){
  return (
    <article className={styles.error_text}>
      <h1>
        <MdError />
        {msg}
      </h1>
    </article>
  );
}

export {Error};