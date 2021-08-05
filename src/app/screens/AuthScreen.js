import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "../features/axios";
import { signInAsync } from "../features/authSlice";

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (event, login) => {
    event.preventDefault();

    if (!email && !password) return alert("Email and password is required!");
    setIsLoading(true);
    try {
      const { data } = await axios.post(`/${login ? "login" : "register"}`, {
        email,
        password,
      });
      dispatch(signInAsync(data));
      history.push("/");
    } catch ({ response }) {
      setIsLoading(false);
      alert(response.data);
    }
  };

  return (
    <AuthScreenContainer>
      <AuthForm>
        <FormTitle>Welcome to Meeting Room</FormTitle>
        <FormInput
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton
          onClick={(e) => submitHandler(e, true)}
          disabled={isLoading}
        >
          Login
        </SubmitButton>
        <SubmitButton
          onClick={(e) => submitHandler(e, false)}
          disabled={isLoading}
        >
          Register
        </SubmitButton>
      </AuthForm>
    </AuthScreenContainer>
  );
}

export default AuthScreen;

const AuthScreenContainer = styled.section`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 230px;
  padding: 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  outline-width: 0;
  border: none;
  border-bottom: 2px solid #000;
  padding: 10px 2px;
  margin-bottom: 10px;
`;

const SubmitButton = styled(Button)`
  margin-bottom: 5px !important;
  background: var(--secondaryColor) !important;
  color: #fff !important;
`;
