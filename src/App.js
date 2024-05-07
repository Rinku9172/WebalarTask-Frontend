import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import './components/Alert'
import Alert from './components/Alert';
import BoardState from './context/boardState';
function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>

      <Router>
        <BoardState>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/home" element={<Home showAlert={showAlert} />} />
            <Route exact path="/" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </BoardState>
      </Router>
    </>
  );
}

export default App;
