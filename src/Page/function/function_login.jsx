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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const currentURL = window.location.href;
    const urlPattern = /\//;
    const isMatchingURL = urlPattern.test(currentURL);
    if (isMatchingURL) {
      document.title = "Login Page";
    }
  }, []);
  const PageSheetMaster = () => {
    // navigate("/SheetMaster");
    window.location.href = "/SheetMaster";
  };
  const handleLogin = async () => {
    axios
      .post("/api/login", {
        User: loginId,
        Password: password,
      })
      .then((res) => {
        // console.log(res.data,"///////////////////")
        if (res.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("Username", res.data[0][3]);
          localStorage.setItem("Lastname", res.data[0][4]);
          localStorage.setItem("UserLogin", res.data[0][0]);
          localStorage.setItem("IDCode", res.data[0][2]);

          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            PageSheetMaster();
          }, 1300);
        } else if (res.status === 401) {
          Swal.fire({
            title: "Username or Password Wrong",
            text: "Please Try Again",
            icon: "error",
            confirmButtonText: "Close",
          });
          return;
        }
      });
  };
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
  };
}

export { LoginTest };
