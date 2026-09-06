import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { BodyMeasurementsPage } from './pages/BodyMeasurementsPage'
import { DashboardPage } from './pages/DashboardPage'
import { RunsPage } from './pages/RunsPage'
import { StrengthPage } from './pages/StrengthPage'
import { StrengthWorkoutDetailPage } from './pages/StrengthWorkoutDetailPage'

function App() {
  return <BrowserRouter><Routes><Route element={<AppLayout />}><Route index element={<DashboardPage />} /><Route path="body-measurements" element={<BodyMeasurementsPage />} /><Route path="runs" element={<RunsPage />} /><Route path="strength" element={<StrengthPage />} /><Route path="strength/:id" element={<StrengthWorkoutDetailPage />} /></Route></Routes></BrowserRouter>
}

export default App
