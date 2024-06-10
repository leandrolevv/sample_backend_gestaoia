import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SkillsPage from './components/SkillPage';
import StudentListPage from './components/StudentListPage';
import UserListPage from './components/UserListPage';
import ProjetoForm from './components/ProjectForm';
import AllocationResult from './components/AllocationResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/students" element={<StudentListPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/project" element={<ProjetoForm />} />
        <Route path="/allocationresults" element={<AllocationResult />} />
      </Routes>
    </Router>
  );
}

export default App;