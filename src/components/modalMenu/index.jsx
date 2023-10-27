import { createPortal } from "react-dom";
import styles from './modalMenu.module.css';
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoCalendarSharp } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuCalendarOff } from "react-icons/lu";
import { FaImages } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export const ModalMenu = ({closeModal}) => {
  const [pathSelected, setPathSelected] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setPathSelected(location.pathname);
  }, [location]);

  return (
    createPortal(
      <section 
        className={styles.modal_container}
        onClick={() => {
          setTimeout(() => {
            closeModal();
          }, 200);
        }}
      >
        <article className={styles.modal}>
          <HiMenu 
            onClick={closeModal}
            className={styles.menu_icon}
          />
          <nav>
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
          </nav>
        </article>
      </section>,
      document.getElementById('modal')
    )
  );
}