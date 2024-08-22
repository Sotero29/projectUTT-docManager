import React, { useEffect, useState }from 'react'
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../redux/actionCreators/authActionCreator'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [success, setSuccess]= useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !passwordConfirmation) {
      alert('Rellene todos los campos')
      return
    }
    if (password != passwordConfirmation) {
      alert('Las contraseñas no son iguales')
      return
    }

    dispatch(signUpUser(name, email, password, setSuccess))
  }

  useEffect(() => {
    if (success) {
      navigate('/dashboard')
    }
  }, [success])

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <div className='form-group my-2'>
        <input
          type="text"
          name='name'
          className='form-control'
          placeholder='Nombre'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-group my-2'>
        <input
          type="email"
          name='email'
          className='form-control'
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group my-2'>
        <input
          type="password"
          name='password'
          className='form-control'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='form-group my-2'>
        <input
          type="password"
          name='passwordConfirmation'
          className='form-control'
          placeholder='Confirmar contraseña'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary my-2 form-control'>
        Registrarse
      </button>
    </form>
  )
}

export default RegisterForm 