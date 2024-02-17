import React from 'react'
import { Link } from 'react-router-dom'


const RutaNoEncontrada = () => {
    return (
        <div>
            <h1>Error 404 - Ruta no encontrada</h1>
            <Link to='/'>Volver al Home...</Link>
        </div>
    )
}


export default RutaNoEncontrada