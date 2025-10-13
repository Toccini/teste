import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Properties from './pages/Properties/Properties.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Login from './pages/Login/Login.jsx'
import ListProperty from './pages/ListProperty/ListProperty.jsx'
import Admin from './pages/Admin/Admin.jsx'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imoveis" element={<Properties />} />
            <Route path="/imoveis/:id" element={<PropertyDetails />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/anunciar" element={<ListProperty />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App