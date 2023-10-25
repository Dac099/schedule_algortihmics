import styles from './App.module.css';
import { IoCalendarSharp } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuCalendarOff } from "react-icons/lu";
import { FaImages } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
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
import { ModalMenu } from '../../modalMenu';

function App(){
  const location = useLocation();
  const navigate = useNavigate();
  const [pathSelected, setPathSelected] = useState('/');
  const [ showModal, setShowModal ] = useState(false);

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

  function closeModal(){
    setShowModal(false);
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

        <HiMenu 
          className={styles.menu_icon}
          onClick={() => setShowModal(true)}
        />

        <button 
          onClick={signOut}
          className={styles.close_btn}
        >
          <GoSignOut />
        </button>
      </nav>

      { showModal &&
        <ModalMenu
          closeModal={closeModal}
        />
      }

      {/* {location.pathname === '/' 
        ? <Schedule /> 
        : <article>
            <Outlet />
          </article>
      } */}
    </>
  )
}

export {App}