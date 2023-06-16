import { 
  Link, 
  Outlet,
  useLocation 
} from "react-router-dom"
import { Schedule } from "../Schedule";

function App(){
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Calendario</Link>
          </li>
          
          <li>
            <Link to={"/clases"}>Clases Muestra</Link>
          </li>

          <li>
            <Link to={"/instructores"}>Instructores</Link>
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