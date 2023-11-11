import styles from './imagaCard.module.css';
import { MdOutlineDeleteForever as DeleteBtn } from "react-icons/md";
import { useContext } from 'react';
import { AppContext } from '../../Context/AppData';
import { deleteImage } from '../../firebase/storage';

export function ImageCard({img_url, img_path}){
  const { setFetchData, fetchData } = useContext(AppContext);

  async function handleDelete(){
    await deleteImage(img_path);
    setFetchData(!fetchData);
  }

  return (
    <article className={styles.card}>
      <img src={img_url}/>

      <button 
        type='button'
        onClick={handleDelete}
      >
        Eliminar
        <DeleteBtn  className={styles.delete__icon}/>
      </button>
    </article>
  );
}