import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Dashboard from './components/user/Dashboard'
import PersonalIdentity from './components/user/Forms/PersonalIdentity';
import BusinessCard from './components/user/Forms/BusinessCard';
import GeneratedQr from './components/user/Forms/GeneratedQr';

function App() {  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/personal-identity/:userId" element={<PersonalIdentity />} />
      <Route path="/business-cards/:userId" element={<BusinessCard />} />
      <Route path="/list-generated-qr/:userId" element={<GeneratedQr />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;
