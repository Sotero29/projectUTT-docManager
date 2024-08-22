import React from 'react'
import { Link } from 'react-router-dom'

import LoginForm from '../../../components/AuthComponents/LoginForm'

const Login = () => {
  return (
    <div className='container-fluid'>
      <h1 className='display-1 my-5 text-center'>Iniciar sesión</h1>
      <div className='row'>
        <div className='col-md-5 mx-auto mt-5'>
          <LoginForm />
          <Link to='/register'>No tienes una cuenta? Registrate</Link>
        </div>
      </div>
    </div>
  )
} 

export default Login