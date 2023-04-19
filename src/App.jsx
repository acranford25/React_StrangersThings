import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./Components/Posts";
import Home from "./Components/Home";
import { useState } from "react";
import RegisterForm from "./Components/RegisterForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <h1 id="header"></h1>
      <div id="navbar">
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/posts" className="links">
          Posts
        </Link>
        <Link to="/profile" className="links">
          Profile
        </Link>
        <Link to="/logout" className="links">
          Log Out
        </Link>
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
