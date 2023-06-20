import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom'
import { App } from './components/routes/App'
import { LessonsProvider } from './Context/Lessons';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "clases",
        element: <h1>Las clases muestra</h1>
      },
      {
        path: "instructores",
        element: <h1>Se muestran los instructores</h1>
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LessonsProvider>
      <RouterProvider router={router}/>
    </LessonsProvider>
  </React.StrictMode>,
)
