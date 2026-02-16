import { Routes, Route, Navigate } from 'react-router-dom'
import PremiumLayout from './components/PremiumLayout'
import Problem from './pages/rb/Problem'
import Market from './pages/rb/Market'
import Architecture from './pages/rb/Architecture'
import HLD from './pages/rb/HLD'
import LLD from './pages/rb/LLD'
import Build from './pages/rb/Build'
import Test from './pages/rb/Test'
import Ship from './pages/rb/Ship'
import RBProof from './pages/rb/Proof'
import Home from './pages/resume/Home'
import Builder from './pages/resume/Builder'
import Preview from './pages/resume/Preview'
import Proof from './pages/resume/Proof'

function App() {
  return (
    <Routes>
      {/* Resume Builder Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/proof" element={<Proof />} />
      
      {/* Build Track Routes */}
      <Route path="/rb/01-problem" element={<PremiumLayout step={1}><Problem /></PremiumLayout>} />
      <Route path="/rb/02-market" element={<PremiumLayout step={2}><Market /></PremiumLayout>} />
      <Route path="/rb/03-architecture" element={<PremiumLayout step={3}><Architecture /></PremiumLayout>} />
      <Route path="/rb/04-hld" element={<PremiumLayout step={4}><HLD /></PremiumLayout>} />
      <Route path="/rb/05-lld" element={<PremiumLayout step={5}><LLD /></PremiumLayout>} />
      <Route path="/rb/06-build" element={<PremiumLayout step={6}><Build /></PremiumLayout>} />
      <Route path="/rb/07-test" element={<PremiumLayout step={7}><Test /></PremiumLayout>} />
      <Route path="/rb/08-ship" element={<PremiumLayout step={8}><Ship /></PremiumLayout>} />
      <Route path="/rb/proof" element={<RBProof />} />
    </Routes>
  )
}

export default App
