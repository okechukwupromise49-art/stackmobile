
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './page/HomePage'
import { Admin } from './page/Admin'



function App() {
 

  return (
    <div>
      
      <Routes>
         <Route path="/" element={<HomePage/>}/>
          <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
  )
}

export default App
