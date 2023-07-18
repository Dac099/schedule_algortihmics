import React from "react";
import styles from "./signin.module.css";
import { auth } from "../../../firebase/firebase_sdk";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignInUser(){
  const navigate = useNavigate();
  const [ password, setPassword ] = React.useState("");
  const [ email, setEmail ] = React.useState("");

  async function handleSubmit(e){
    try {    
      e.preventDefault();
  
      const res = await signInWithEmailAndPassword(auth, email, password);
      if(res !== Error){
        navigate("/");
      }
  
      setPassword('')
      setEmail('');
    } catch (error) {
      alert("Correo o contraseña incorrecta");
    }
  }


  return (
    <article>
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
            }}
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
            }}
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