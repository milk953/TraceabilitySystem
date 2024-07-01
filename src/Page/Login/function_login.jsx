import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginTest() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [ipAddress, setIpAddress] = useState("");

  localStorage.setItem("ip", ipAddress);

  useEffect(() => {
    const currentURL = window.location.href;
    const urlPattern = /\//;
    const isMatchingURL = urlPattern.test(currentURL);
    if (isMatchingURL) {
      document.title = "Login Page";
    }
    const page_load = () => {
      axios.get("/api/getIPaddress").then((res) => {
        setIpAddress(res.data.ip);
      });
    };
    page_load();

    const checkStatus = (res) => {
      const token = localStorage.getItem("token");
      let timeout;
      if (token) {
        axios.get('/api/verify', { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            if (response.data.success) {
              setIsLoggedIn(true);
              const decoded = response.data.decoded;
              const expiryTime = new Date(decoded.exp * 1000) - new Date();
              timeout = setTimeout(logout, expiryTime); 
            }
          })
          .catch(() => {
            setIsLoggedIn(false);
          });
      }
      return () => clearTimeout(timeout);
      }
    checkStatus();
  }, []);
  const PageSheetMaster = () => {
    window.location.href = "/SheetMaster";
  };
  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.post("/api/login", {
  //       User: loginId,
  //       Password: password,
  //     })
  //     if (res.status === 200) {
  //       localStorage.setItem("isLoggedIn", "true");
  //       localStorage.setItem("Username", res.data[0][3]);
  //       localStorage.setItem("Lastname", res.data[0][4]);
  //       localStorage.setItem("UserLogin", res.data[0][0]);
  //       localStorage.setItem("IDCode", res.data[0][2]);

  //       setIsLoading(true);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //         window.location.href = "/Homepage";
  //       }, 1300);
  //     } else if (res.status === 401) {
  //       Swal.fire({
  //         title: "Username or Password Wrong",
  //         text: "Please Try Again",
  //         icon: "error",
  //         confirmButtonText: "Close",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during login:", error);
  //     Swal.fire({
  //       title: "An error occurred",
  //       text: "Please try again later",
  //       icon: "error",
  //       confirmButtonText: "Close",
  //     });
  //   }
  // };

  const handleLogin = async () => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { Username:loginId, Password:password });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  } 

  return {
    loginId,
    password,
    showPassword,
    isLoading,
    setLoginId,
    handlePasswordChange,
    togglePasswordVisibility,
    PageSheetMaster,
    handleLogin,
    isLoggedIn
  };
}

export { LoginTest };
