import React from "react";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  return (
    <div className="home">
      <RegisterForm setToken={setToken} />
    </div>
  );
};

export default Home;
