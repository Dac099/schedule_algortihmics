import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom'
import { App } from './components/routes/App'
import { Instructors } from './components/routes/Instructors'
import { Lessons } from "./components/routes/Lessons";
import { LessonsProvider } from './Context/Lessons';
import { AppContextProvider } from './Context/AppData';
import { SignInUser } from './components/routes/SignIn'
import { DaysOff } from './components/routes/DaysOff'
import { Images } from './components/routes/Images'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "clases",
        element: <Lessons />
      },
      {
        path: "instructores",
        element: <Instructors />
      },
      {
        path: "daysoff",
        element: <DaysOff />
      },
      {
        path: "images",
        element: <Images />
      }
    ],
  },
  {
    path: "/signin",
    element: <SignInUser />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <LessonsProvider>
        <RouterProvider router={router}/>
      </LessonsProvider>
    </AppContextProvider>
  </React.StrictMode>,
)
