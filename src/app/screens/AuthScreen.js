import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

function AuthScreen() {
  return (
    <AuthScreenContainer>
      <AuthForm>
        <FormInput />
        <FormInput />
        <SubmitButton>Login</SubmitButton>
        <SubmitButton>Register</SubmitButton>
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
`;

const FormInput = styled.input``;

const SubmitButton = styled(Button)``;
