import React, { useState } from "react";
import LogOut from "./Logout";
import { Routes, Route, Link } from "react-router-dom";
import { loginUser } from "../api";
import useAuth from "../hooks/useAuth";

export default function LogIn() {
  const [myUsername, setMyUsername] = useState("");
  const [myPassword, setMyPassword] = useState("");

  const { user, setUser, token, setToken } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await loginUser(myUsername, myPassword);
      console.log("result in Login Comp", result);
      result.success
        ? (setToken(result.data.token),
          alert(result.data.message),
          setMyUsername(""),
          setMyPassword(""))
        : alert(result.error.message),
        setMyPassword("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogOut(event) {
    event.preventDefault();
    token
      ? confirm("Are you sure you want to logout?") &&
        (setToken(null), localStorage.removeItem("token"), setUser(null))
      : alert("No users are signed in!");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          username="username"
          placeholder="username"
          value={myUsername}
          onChange={(event) => setMyUsername(event.target.value)}
        />
        <input
          type="text"
          password="password"
          placeholder="password"
          value={myPassword}
          onChange={(event) => setMyPassword(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <form onSubmit={handleLogOut}>
        <button>LogOut</button>
      </form>
    </div>
  );
}
