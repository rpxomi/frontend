import { React, useState } from 'react'


const FormularioRegistrarse = () =>
{
    const BASE_URL = 'http://localhost:8081'

    
    // UNIONES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [ email,    setEmail    ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ nombre,   setNombre   ] = useState( '' )

    const [ cargando, setCargando ] = useState( false )
    const [ error,    setError    ] = useState( '' )


    // FUNCIONES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const enviarFormulario = async (e) => 
    {
        e.preventDefault()
        setCargando( true )

        const payload = 
        {
               email: email,
            password: password,
                name: nombre
        }

        const settings = 
        {
             method: 'POST',
               body: JSON.stringify( payload ),
            headers: { 'Content-Type': 'application/json' }
        }

        try
        {
            // peticion
            const respuesta = await fetch( `${BASE_URL}/sign-up`, settings )
            // si hay error
            if( !respuesta.ok )
            {
                throw new Error( 'Error al registrarse' )
            }
            // si todo sale bien
            setEmail( '' )
            setPassword( '' )
            setNombre( '' )
        }
        catch( error )
        {
            setError( error.message )
            console.log( error )
        }

        setCargando( false )
    }


    // RETORNO - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return(
        <div>
            <form onSubmit = { enviarFormulario }>
                <input
                    type        = 'text'
                    placeholder = 'Correo'
                    value       = { email }
                    onChange    = { (e) => setEmail( e.target.value ) }
                />
                <br/>
        
                <input
                    type        = 'text'
                    placeholder = 'Nombre'
                    value       = { nombre}
                    onChange    = { (e) => setNombre( e.target.value ) }
                />
                <br/>
        
                <input
                    type        = 'text'
                    placeholder = 'Contraseña'
                    value       = { password }
                    onChange    = { (e) => setPassword( e.target.value ) }
                />
                <br/>
                
                {/* primero mostrar el boton y despues un mensaje mientras se envia la peticion */}
                {
                    cargando ? (<p>Cargando...</p>) : (<button type='submit'>Registrarse</button>)
                }
                {/* si error tiene un valor, error se convierte en verdadero por la presencia de ese valor y se muestra */}
                { error && <p>{ error }</p> }
            </form>
        </div>
    )


}


export default FormularioRegistrarse