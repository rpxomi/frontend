import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const FormularioIniciarSesion = () =>
{
    const BASE_URL = 'http://localhost:8081'
    const navigate = useNavigate()

    
    // UNIONES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [ email,    setEmail    ] = useState( '' )
    const [ password, setPassword ] = useState( '' )

    const [ cargando, setCargando ] = useState( false )
    const [ error,    setError    ] = useState( '' )


    // FUNCIONES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const enviarFormulario = async (e) => {

        e.preventDefault()
        setCargando( true )

        const payload = 
        {
          username: email,
          password: password
        }

        const settings = 
        {
           method: 'POST',
             body: JSON.stringify( payload ),
          headers: { 'Content-Type': 'application/json' }
        }

        try
        {
            await fetch( `${BASE_URL}/authenticate`, settings )
            .then
            (
                respuesta => 
                {
                    if( !respuesta.ok )
                    {
                        throw new Error( 'Credenciales inválidas' )
                    }
                    else
                    {
                        setEmail( '' )
                        setPassword( '' )
                        return respuesta.json()
                    }
                }
            )
            .then
            (
                datos => 
                {
                    if( datos.role === 'CUSTOMER' )
                    {
                        navigate( '/cliente', {replace: true}  )
                    }
                    // en el Backend que dieron, al registrarse NO asigna el rol ADMIN(enumerador 0) !!!
                    else if( datos.role === 'ADMIN' )
                    {
                        navigate( '/admin', {replace: true}  )
                    }
                    else
                    {
                        navigate( '/iniciar-sesion', {replace: true}  )
                    }
                }
            )
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
                    placeholder = 'Password'
                    value       = { password }
                    onChange    = { (e) => setPassword( e.target.value ) }
                />
                <br/>

                {
                    cargando ? (<p>Cargando...</p>) : (<button type='submit'>Iniciar sesión</button>)
                }

                { error && <p>{ error }</p> }
            </form>
        </div>
    )


}


export default FormularioIniciarSesion