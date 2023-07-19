import styles from './App.module.css';
import { IoCalendarSharp } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuCalendarOff } from "react-icons/lu";
import { FaImages } from "react-icons/fa";
import { 
  Link, 
  Outlet,
  useLocation 
} from "react-router-dom"
import { useEffect, useState } from 'react';
import { Schedule } from "../../Schedule";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../firebase/firebase_sdk";

function App(){
  const location = useLocation();
  const navigate = useNavigate();
  const [pathSelected, setPathSelected] = useState('/');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(!user){
        navigate("/signin");
      }
    });
    setPathSelected(location.pathname);
  }, 
  [location]);

  function signOut(){
    auth.signOut();
  }

  return (
    <>
      <nav className={styles.nav_container}>
        <ul className={styles.nav_options}>
          <li>
            <Link 
              to={"/"} 
              className={pathSelected === '/' ? styles.selected : 'a'}
            >
              <IoCalendarSharp 
                className={pathSelected === '/' ? styles.show : styles.hide}
              />
              Calendario
            </Link>
          </li>
          
          <li>
            <Link 
              to={"/clases"} 
              className={pathSelected === '/clases' ? styles.selected : 'a'}
            >
              <MdClass 
                className={pathSelected === '/clases' ? styles.show : styles.hide}
              />
              Clases Muestra
            </Link>
          </li>

          <li>
            <Link 
              to={"/instructores"} 
              className={pathSelected === '/instructores' ? styles.selected : 'a'}
            >
              <FaChalkboardTeacher 
                className={pathSelected === '/instructores' ? styles.show : styles.hide}
              />
              Instructores
            </Link>
          </li>

          <li>
            <Link
              to={"/daysoff"}
              className={pathSelected === "/daysoff" ? styles.selected : 'a'}
            >
              <LuCalendarOff 
                className={pathSelected === '/daysoff' ? styles.show : styles.hide}
              />
              Days Off
            </Link>
          </li>
          
          <li>
            <Link
              to={"/images"}
              className={pathSelected === "/images" ? styles.selected : 'a'}
            >
              <FaImages
                className={pathSelected === '/images' ? styles.show : styles.hide}
              />
              Imágenes
            </Link>
          </li>

        </ul>

        <button 
          onClick={signOut}
          className={styles.close_btn}
        >
          Salir
        </button>
      </nav>

      {location.pathname === '/' 
        ? <Schedule /> 
        : <article>
            <Outlet />
          </article>
      }
    </>
  )
}

export {App}