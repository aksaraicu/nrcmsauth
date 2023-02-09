import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);

      setName(decoded.name);
      setEmail(decoded.email);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className="container mb-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome back, {name}</h2>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
