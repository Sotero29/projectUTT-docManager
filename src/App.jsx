import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import { Login, Register, HomePage, DashboardPage } from './pages'
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkIsLoggedIn())
  }, [])

  return (
    <div className='App'>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard/*' element={<DashboardPage/>} />
      </Routes>
    </div>
  )
}

export default App
