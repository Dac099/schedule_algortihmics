import styles from "./Images.module.css";
import { useState } from "react";

function Images() {
  const [showInputImg, setShowInputImg] = useState(false);
  const [ expand, setExpand ] = useState(false);

  function openInputImg(){
    setShowInputImg(true);
  }

  function closeInputImg(){
    setShowInputImg(false);
  }

  return (
    <article className={styles.container}>
      <p className={styles.title}>Imágenes mostradas en la landing</p>
      <hr/>

      <section 
        className={expand ? `${styles.upload__container} ${styles.show}` : styles.upload__container}        
      >
        <button
          className={styles.show_btn}
          onClick={() => {
            setExpand(true);
            setTimeout(() => {
              openInputImg();
            }, 500);
          }}
        >
          Subir nueva imagen
        </button>

        {showInputImg &&
          <article className={styles.new_file__container}>

            <section>
              <label htmlFor="file_name">Nombre para la imagen</label>
              <input 
                className={styles.file_name}
                type="text" 
                name="file_name" 
                id="file_name"   
              />
            </section>

            <section className={styles.file_input}>
              <label htmlFor="file">Selecciona una imagen.</label>
              <input 
                type="file" 
                name="file" 
                id="file" 
                multiple
                onChange={e => console.log(e.target.files)}
              />
            </section>

            <button 
              type="button"
              className={styles.upload_btn}
            >
              Subir
            </button>
          </article>
        }
      </section>

      <hr />

      <section>

      </section>
    </article>
  )
}

export {Images}