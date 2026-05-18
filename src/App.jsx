
import { BrowserRouter, Routes, Route,Navigate, useNavigate } from 'react-router-dom'

import './App.css'
import Home from './projectmanage/Home'
import About from './projectmanage/Workersm'
import Materials from './projectmanage/Materials'
import Expenses from './projectmanage/Expenses'
import Slidebar from './projectmanage/Slidebar'
import Reuseablecomponent from './projectmanage/Reusecomps'
import Timeline from './projectmanage/Timeline'
import Login from './projectmanage/login'

  function ProtectedRoute({children}) {
  const loggedIn = localStorage.getItem('workerEmail') ||
  sessionStorage.getItem('workerEmail')
  if(!loggedIn) {

    return <Navigate to='/login' />
  }
  return children
  }

function App() {
  
  return (
    <>
    <BrowserRouter>
    <div className='navbars'>
      <Slidebar />
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path='/workers' element={<ProtectedRoute><About /></ProtectedRoute>}/>
      <Route path='/materials' element={<ProtectedRoute><Materials /></ProtectedRoute>} />
      <Route path='/expenses' element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
      <Route path='/reuse' element={<ProtectedRoute><Reuseablecomponent /></ProtectedRoute>} />
      <Route path='/timeline' element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
