import LogOut from "./Logout";
import { Routes, Route, Link } from "react-router-dom";

export default function LogIn() {
  return (
    <div>
      <form>
        <input username="username" placeholder="username" />
        <input password="password" placeholder="password" />
        <button>Submit</button>
      </form>
      <Link to="/logOut">LogOut</Link>
      <Routes>
        <Route path="/logOut" element={<LogOut />} />
      </Routes>
    </div>
  );
}
