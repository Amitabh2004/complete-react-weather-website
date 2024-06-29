import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from './HomeComponents/Sidebar';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weather" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;