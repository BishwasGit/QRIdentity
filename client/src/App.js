import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Dashboard from './components/user/Dashboard'
function App() {  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;