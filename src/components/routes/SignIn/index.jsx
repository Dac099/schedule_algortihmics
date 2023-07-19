import React from "react";
import styles from "./signin.module.css";
import { auth } from "../../../firebase/firebase_sdk";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignInUser(){
  const navigate = useNavigate();
  const [ password, setPassword ] = React.useState("");
  const [ email, setEmail ] = React.useState("");
  const [ onError, setOnError ] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        navigate("/");
      }
    });
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      navigate("/");
      setPassword('')
      setEmail('');
    })
    .catch(error => {
      setOnError(true);
    })
  }


  return (
    <article className={styles.container}>
      {onError && <p className={styles.text_error}>Correo o contraseña incorrectos</p>}
      <form
        onSubmit={e => handleSubmit(e)}
      >

        <div>
          <label htmlFor="email">Ingresa el correo</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setOnError(false);
            }}
            className={onError ? styles.input_error : ''}
          />
        </div>

        <div>
          <label htmlFor="password">Ingresa la contraseña</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setOnError(false);
            }}
            className={onError ? styles.input_error : ''}
          />
        </div>

        <button 
          type="submit"
        >
          Ingresar
        </button>

      </form>

    </article>
  )
}

export {SignInUser};