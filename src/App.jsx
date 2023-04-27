import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Post from "./Components/Post";
import Posts from "./Components/Posts";
import Home from "./Components/Home";
import RegisterForm from "./Components/RegisterForm";
import Profile from "./Components/Profile";
import LogIn from "./Components/Login";
import useAuth from "./hooks/useAuth";
import EditPost from "./Components/EditPost";
import Message from "./Components/Message";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <div id="header">
        <div id="navbar">
          {user && user.username ? (
            <div id="user">
              {user.username.length > 10
                ? `Hi, ${user.username.substring(0, 8)}..`
                : `Hi, ${user.username}`}
            </div>
          ) : (
            <div id="user">Hi, Guest!</div>
          )}
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/posts" className="links">
            Posts
          </Link>
          <Link to="/profile" className="links">
            Profile
          </Link>
          <Link to="/post" className="log">
            Post
          </Link>
          <Link to="/logIn" className="log">
            Log In/Out
          </Link>
          <Link to="/register" className="log">
            Register
          </Link>
        </div>
        <div id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
            <Route path="/logIn/*" element={<LogIn />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/:postId" element={<EditPost />} />
            <Route path="/:postId/messages" element={<Message />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
