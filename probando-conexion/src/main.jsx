import React from 'react'
import ReactDOM from 'react-dom/client'


import Home from './pages/Home.jsx'
import RutaNoEncontrada from './pages/RutaNoEncontrada.jsx'

import Registrarse from './pages/Registrarse.jsx'
import IniciarSesion from './pages/IniciarSesion.jsx'


// BORRAR: NO se tienen que dejar el acceso a /admin y /cliente desde la URL !!!
import Admin from './pages/Admin.jsx'
import Cliente from './pages/Cliente.jsx'


// RUTAS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <RutaNoEncontrada/>
    },

    {
        path: '/registrarse',
        element: <Registrarse/>
    },
    {
        path: '/iniciar-sesion',
        element: <IniciarSesion/>
    },

    
    // BORRAR: NO se tienen que dejar el acceso a /admin y /cliente desde la URL !!!
    {
        path: '/admin',
        element: <Admin/>
    },
    {
        path: '/cliente',
        element: <Cliente/>
    },
])
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>,
)