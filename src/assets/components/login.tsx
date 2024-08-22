import { Divide, GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import styled from "styled-components";
import React, { useState } from "react";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  width: 20rem;
  height: 24rem;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 2rem;
  color: rgba(243, 244, 246, 1);

  justify-content: center;
`;
const Line = styled.div`
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(55, 65, 81, 1);
`;
const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;
const Form = styled.form`
  margin-top: 1.5rem;
`;
const InputGroup = styled.div`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
const InputGroupLabel = styled.label`
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
`;
const InputGroupInput = styled.input`
  width: 90%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);

  &:focus {
    border-color: rgba(167, 139, 250);
  }
`;
const Forgot = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
  margin: 8px 0 14px 0;
`;
const ForgotAndSignupA = styled.a`
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
  }
`;
const Signin = styled.button`
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
`;
const SocialMessage = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(156, 163, 175, 1);
`;
const SocialMessageMessage = styled.p`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(156, 163, 175, 1);
`;
const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
`;
const SocialIconsIcons = styled.button`
  border-radius: 0.125rem;
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  margin-left: 8px;
`;
const SocialIconsIconsSvg = styled.svg`
  height: 1.25rem;
  width: 1.25rem;
  fill: #fff;
`;
const Signup = styled.p`
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
`;

export function LoginPage({ setSignin }) {
  function addSignin() {
    setSignin(true);
  }
  
  
  
  return (
    <PageContainer>
      <FormContainer>
        <Title>Login</Title>
        <Form>
          <InputGroup>
            <InputGroupLabel>Username</InputGroupLabel>
            <InputGroupInput type="text" name="username"></InputGroupInput>
          </InputGroup>
          <InputGroup>
            <InputGroupLabel>Password</InputGroupLabel>
            <InputGroupInput type="text" name="password"></InputGroupInput>
            <Forgot>
              <ForgotAndSignupA></ForgotAndSignupA>
            </Forgot>
          </InputGroup>
          <Signin onClick={addSignin}>Sign in</Signin>
        </Form>
        <SocialMessage>
          <Line></Line>
          <SocialMessageMessage>
            Login with social accounts
          </SocialMessageMessage>
          <SocialIcons>
            <SocialIconsIcons>
              <GoogleLogo size={32} color="white" />
            </SocialIconsIcons>
            
            <SocialIconsIcons aria-label="Log in with Twitter">
              <TwitterLogo size={32} color="white" />
            </SocialIconsIcons>
            <SocialIconsIcons aria-label="Log in with GitHub">
              <GithubLogo size={32} color="white" />
            </SocialIconsIcons>
          </SocialIcons>
          <Line></Line>
        </SocialMessage>
        <Signup>
          Don't have an account?<ForgotAndSignupA>Sign up</ForgotAndSignupA>
        </Signup>
      </FormContainer>
    </PageContainer>
  );
}
