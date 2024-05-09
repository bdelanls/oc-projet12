import './styles/main.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavAside from './components/NavAside'
import Dashboard from './pages/Dashboard'
import Erreur404 from './pages/Erreur404'

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <NavAside />
        <Routes>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path='/erreur404' element={<Erreur404 />} />
          <Route path='*' element={<Erreur404 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
