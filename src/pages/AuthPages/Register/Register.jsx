import React from 'react'
import { Link } from 'react-router-dom'

import RegisterForm from '../../../components/AuthComponents/RegisterForm'

const Register = () => {
  return (
    <div className='container-fluid'>
      <h1 className='display-1 my-5 text-center'>Registro</h1>
      <div className='row'>
        <div className='col-md-5 mx-auto mt-5'>
          <RegisterForm />
          <Link to='/login'>Inicia sesión!</Link>
        </div>
      </div>
    </div>
  )
}

export default Register