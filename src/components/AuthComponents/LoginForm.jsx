import React, { useEffect, useState } from 'react'
import { signInUser } from '../../redux/actionCreators/authActionCreator'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess]= useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Rellena todos los campos')
      return
    }

    dispatch(signInUser(email, password, setSuccess))
  }

  useEffect(() => {
    if (success) {
      navigate('/dashboard')
    }
  })

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
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
      <button type='submit' className='btn btn-primary my-2 form-control'>
        Iniciar
      </button>
    </form>
  )
}

export default LoginForm