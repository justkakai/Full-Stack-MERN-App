import { Routes, Route } from 'react-router'

import Registration from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';

import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<NavBar />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
