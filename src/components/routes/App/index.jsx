import styles from './App.module.css';
import { IoCalendarSharp } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { 
  Link, 
  Outlet,
  useLocation 
} from "react-router-dom"
import { useEffect, useState } from 'react';
import { Schedule } from "../../Schedule";

function App(){
  const location = useLocation();
  const [pathSelected, setPathSelected] = useState('/');

  useEffect(() => {
    setPathSelected(location.pathname);
  }, 
  [location]);

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

        </ul>
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