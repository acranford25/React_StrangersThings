import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./Components/Posts";
import Home from "./Components/Home";
import RegisterForm from "./Components/RegisterForm";
import Profile from "./Components/Profile";
import LogIn from "./Components/Login";
import LogOut from "./Components/Logout";

function App() {
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
        <Link to="/logIn" className="links">
          Log In/Out
        </Link>
        <Link to="/register" className="links">
          Register
        </Link>
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
