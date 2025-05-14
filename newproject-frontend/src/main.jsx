import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import Tasks from './Tasks.jsx'
import Landing from './Landing.jsx'
import Register from './Register.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditCard from './EditCard.jsx'
import NewTask from './NewTask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/tasks/" element={<Tasks />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/edit/" element={<EditCard />} />
        <Route path="/newtask/" element={<NewTask />} />
      </Routes>
    </Router>
  </StrictMode>,
)
