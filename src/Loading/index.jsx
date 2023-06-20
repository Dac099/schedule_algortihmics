import styles from "./Loading.module.css";
import { FiLoader } from "react-icons/fi";

function Loading(){
  return <FiLoader className={styles.spinner} />
}

export {Loading};