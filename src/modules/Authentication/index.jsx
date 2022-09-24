import { Button, Card, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import s from "./styles.module.scss";
import { useFormik } from "formik";
import { useLoginMutation } from "modules/Authentication/api";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./feature/LogIn";
import Register from "./feature/Register";

const Auth = () => {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [access_token, setLocal] = useLocalStorage("access_token");

  useEffect(() => {
    if (access_token) navigate(-1);
  }, []);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Login showSignUp={showSignUp} setShowSignUp={(state) => setShowSignUp(state)} />
      <Register showSignUp={showSignUp} setShowSignUp={(state) => setShowSignUp(state)} />
    </div>
  );
};

export default Auth;
