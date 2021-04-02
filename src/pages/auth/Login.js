import React from "react";
import styled from "styled-components";
import { useOvermind } from "../../store";
import useForm from "../../hooks/useForm";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Spinner from "../../components/Spinner";
import Logo from "../../assets/Logo.svg";

const LoginStyled = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  background: var(--bgGrey);

  .logo-container {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
    img {
      height: 60px;
    }
  }

  .form-wrapper {
    width: 400px;
    min-height: 200px;
    padding: 20px;
    border-radius: 8px;
    background: var(--bgWhite);
    box-shadow: var(--bs2);
    h4 {
      color: var(--textGrey);
      text-align: center;
      margin-bottom: 20px;
    }

    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function Login({ setFormHandler }) {
  let { inputs, handleChange } = useForm({
    email: "test@example.com",
    password: "123456",
  });

  const {
    actions: { user },
    state: { user: userState },
  } = useOvermind();

  function submitHandler(e) {
    e.preventDefault();
    user.loginUser(inputs);
  }

  return (
    <LoginStyled>
      <div className="logo-container">
        <img src={Logo} alt="thullo brand logo" />
      </div>

      <div className="form-wrapper">
        <h4>Log in to Thullo</h4>

        <form onSubmit={submitHandler}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="false"
            value={inputs.email}
            onChange={handleChange}
            style={{ height: "45px" }}
          />
          <Input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            style={{ height: "45px" }}
          />
          {userState.userError && (
            <p style={{ color: "red" }}>{userState.userError}</p>
          )}

          <Button
            style={{ height: "45px", margin: "10px 0px" }}
            disabled={userState.userLoading}
          >
            {userState.userLoading ? <Spinner /> : "Log in"}
          </Button>

          <div>
            Don't have a account?{" "}
            <a className="link" onClick={() => setFormHandler("register")}>
              Sign up for one
            </a>
          </div>
        </form>
      </div>
    </LoginStyled>
  );
}
