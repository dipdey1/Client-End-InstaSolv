import './App.css'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRoutes from './Components/privateRoutes/PrivateRoutes'
import { AuthProvider } from './Utils/Context/AuthContext'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route element={<PrivateRoutes/>}>
          <Route path='/home' element={<Home />}/>
          <Route path='/history' element={<Home />}/>
          <Route path='/Profile' element={<Home />}/>
        </Route>
        
      </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
