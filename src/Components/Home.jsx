import React from "react";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="home">
      <RegisterForm setToken={setToken} />
    </div>
  );
};

export default Home;
