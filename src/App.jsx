import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import AssetList from './pages/AssetList'
import AssetForm from './pages/AssetForm'
import About from './pages/About'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<AssetList />} />
          <Route path="/add" element={<AssetForm />} />
          <Route path="/edit/:id" element={<AssetForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </>
  )
}

export default App
