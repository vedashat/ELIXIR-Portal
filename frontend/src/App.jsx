import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FindDonors from './pages/FindDonors'
import BloodInfo from './pages/BloodInfo'
import Helpline from './pages/Helpline'
import RegisterDonor from './pages/RegisterDonor'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-donors" element={<FindDonors />} />
          <Route path="/blood-info" element={<BloodInfo />} />
          <Route path="/helpline" element={<Helpline />} />
          <Route path="/register" element={<RegisterDonor />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
