import { Routes, Route } from 'react-router'

import Registration from './components/Register';
import Login from './components/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
