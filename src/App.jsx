import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./Components/Posts";

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
        <Link to="/logout" className="links">
          Log Out
        </Link>
      </div>
      <div id="main">
        <Routes>
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
