import { Divide, GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
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
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [signup, setSignup] = useState(false);
  const HOST_URL_API= process.env.HOST_URL_API
  function signupOn() {
    setSignup(true);
  }
  function signupOff() {
    setSignup(false);
  }
  async function signUp(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`${HOST_URL_API}/signup`, {
        username,
        password,
      });
      alert(response.data);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  }
  async function addSignin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`${HOST_URL_API}/login`, {
        username,
        password,
      });
      console.log(response.data);

      if (response.status === 201) {
        setSignin(true);
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("signin", "true");

        const userId = response.data.idLogin;
        
        sessionStorage.setItem("userId", userId);
        location.reload()
      }
    } catch (err) {
      if (err.response.status === 500) {
        alert("Login not exist");
      } else if (err.response.status === 404) {
        alert("Password is incorrect");
      }
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <Title>{signup ? "Sign up" : "Login"}</Title>
        <Form onSubmit={signup ? signUp : addSignin}>
          <InputGroup>
            <InputGroupLabel>Email</InputGroupLabel>
            <InputGroupInput
              type="email"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            ></InputGroupInput>
          </InputGroup>
          <InputGroup>
            <InputGroupLabel>Password</InputGroupLabel>
            <InputGroupInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></InputGroupInput>
            <Forgot>
              <ForgotAndSignupA></ForgotAndSignupA>
            </Forgot>
          </InputGroup>

          <Signin type="submit">{signup ? "Sign up" : "Sign in"}</Signin>
        </Form>
        <SocialMessage>
          <Line></Line>

          <SocialIcons>
            <SocialIconsIcons></SocialIconsIcons>
          </SocialIcons>
          <Line></Line>
        </SocialMessage>
        <Signup>
          {signup ? "Do have an account?" : "Dont have an account?"}{" "}
          <ForgotAndSignupA onClick={signup ? signupOff : signupOn}>
            {" "}
            {signup ? "Login" : "Sign up"}
          </ForgotAndSignupA>
        </Signup>
      </FormContainer>
    </PageContainer>
  );
}
