import React, { useState } from "react";
import { registerUser } from "../api";
import useAuth from "../hooks/useAuth";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, user } = useAuth();
  console.log("User from RegisterForm: ", user);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await registerUser(username, password);
      console.log("result in comp", result);
      result.success
        ? (setToken(result.data.token),
          localStorage.setItem("token", result.data.token))
        : alert(result.error.message);
    } catch (error) {
      console.log("trouble handling user", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          required={true}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          required={true}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
