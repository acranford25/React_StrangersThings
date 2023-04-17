import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./Components/Posts";

function App() {
  return (
    <div className="App">
      <h1 id="header"></h1>
      <div id="navbar">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Log Out</Link>
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
