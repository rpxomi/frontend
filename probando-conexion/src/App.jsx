import { useState } from 'react'


function Saludar( {mostrar} ) {
  if( mostrar )
    return <h1>Bienvenido usuario normal</h1>
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Formulario() {
  const [usuarioEmail, setUsuarioEmail] = useState( "" )
  const [usuarioPassword, setUsuarioPassword] = useState( "" )
  const [usuarioNombre, setUsuarioNombre] = useState( "" )

  const [mostrar, setMostrar] = useState( false )

  const usuarioEmailCambiado = e => setUsuarioEmail( e.target.value )
  const usuarioPasswordCambiado = e => setUsuarioPassword( e.target.value )
  const usuarioNombreCambiado = e => setUsuarioNombre( e.target.value )


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>> obtener datos de la API...
  const registrarUsuario = e => {
    const crearUsuario = {
      email: usuarioEmail,
      password: usuarioPassword,
      name: usuarioNombre
    }

    const settings = {
      method:"POST",
      body: JSON.stringify(crearUsuario),
      headers: {'Content-Type' : 'application/json'}
    }


    fetch( 'http://localhost:8081/sign-up', settings )

    .then( response => {
      if( response.ok != true )
        alert( "No se ha registrado al usuario" )
      else
        return response.json()
    })
  }


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const iniciarSesion = e => {
    const iniciarSesion = {
      username: usuarioEmail,
      password: usuarioPassword
    }

    const settings = {
      method:"POST",
      body: JSON.stringify(iniciarSesion),
      headers: {'Content-Type' : 'application/json'}
    }


    fetch( 'http://localhost:8081/authenticate', settings )

    .then( response => {
      if( response.ok != true )
        alert( "No se pudo iniciar sesion" )
      else
        return response.json()
    })

    .then( usuario => {
      if( usuario.role == 'CUSTOMER' ) {
        console.log( 'Es un usuario normal' )
        setMostrar( true )
      }
    })
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const enviarFormulario = e => {
    e.preventDefault()
    registrarUsuario()
  }


  const enviarFormularioInicioSesion = e => {
    e.preventDefault()
    iniciarSesion()
  }


  return(
    <div>
      <form onSubmit={enviarFormulario}>

        <input
          type='text'
          placeholder='Correo'
          value={usuarioEmail}
          onChange={usuarioEmailCambiado}
        />
        <br/>

        <input
          type='text'
          placeholder='Nombre'
          value={usuarioNombre}
          onChange={usuarioNombreCambiado}
        />
        <br/>

        <input
          type='text'
          placeholder='Contraseña'
          value={usuarioPassword}
          onChange={usuarioPasswordCambiado}
        />
        <br/>

        <button type='submit'>Registarse</button>
      </form>


      <br/>


      <form onSubmit={enviarFormularioInicioSesion}>
        <input
            type='text'
            placeholder='Correo'
            value={usuarioEmail}
            onChange={usuarioEmailCambiado}
          />
          <br/>

          <input
            type='text'
            placeholder='Password'
            value={usuarioPassword}
            onChange={usuarioPasswordCambiado}
          />
          <br/>

          <button type='submit'>Iniciar sesión</button>
      </form>


      <Saludar mostrar={mostrar} />
    </div>
  )
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function App() {
  return (
    <>
      <div>
        <Formulario />
      </div>
    </>
  )
}


export default App
