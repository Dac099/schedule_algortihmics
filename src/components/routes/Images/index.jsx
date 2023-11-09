import styles from "./Images.module.css";
import { useState } from "react";
import { UploadImage } from "../../../firebase/storage";

function Images() {
  const [ showInputImg, setShowInputImg ] = useState(false);
  const [ expand, setExpand ] = useState(false);
  const [ fileList, setFileList ] = useState(null);
  const [ fileName, setFileName ] = useState('');
  const [ onError, setOnError ] = useState(false);
  const [ onLoad, setOnLoad ] = useState(false);
  // const [ onErro, ]

  function openInputImg(){
    setShowInputImg(true);
  }

  function closeInputImg(){
    setShowInputImg(false);
  }

  function handleUploadImages(){
    if(fileName.trim().length < 1){
      setOnError(true);
      return;
    }

    const file_promises = [];                

    for(let i=0; i < fileList.length; i++){
      file_promises.push(UploadImage(fileList[i], fileName));
    }

    Promise.all(file_promises)
    .finally(() => {
      closeInputImg();
      setExpand(false);
    });
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
          <article className={onError ? `${styles.new_file__container} ${styles.error}` : styles.new_file__container}>

            <section>
              <label htmlFor="file_name">Nombre para la imagen</label>
              <input 
                className={styles.file_name}
                type="text" 
                name="file_name" 
                id="file_name"   
                onChange={e => {
                  setFileName(e.target.value);
                  setOnError(false);
                }}
              />

              {onError &&
                <p className={styles.text_error}>La imagen debe de tener nombre</p>
              }
            </section>

            <section className={styles.file_input}>
              <label htmlFor="file">Selecciona una imagen.</label>
              <input 
                type="file" 
                name="file" 
                id="file" 
                multiple
                onChange={e => setFileList(e.target.files)}
              />
            </section>

            <button 
              type="button"
              className={styles.upload_btn}
              onClick={handleUploadImages}
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