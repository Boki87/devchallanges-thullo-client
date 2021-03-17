import React from "react";
import styled from "styled-components";
import { useOvermind } from "../../store";
import useForm from "../../hooks/useForm";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Spinner from "../../components/Spinner";
import Logo from "../../assets/Logo.svg";

const RegisterStyled = styled.div`
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

export default function Register({ setFormHandler }) {
  let { inputs, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const {
    actions: { user },
    state: { user: userState },
  } = useOvermind();

  function submitHandler(e) {
    e.preventDefault();
    user.registerNewUser(inputs);
  }

  return (
    <RegisterStyled>
      <div className="logo-container">
        <img src={Logo} alt="thullo brand logo" />
      </div>

      <div className="form-wrapper">
        <h4>Register for a new account</h4>

        <form onSubmit={submitHandler}>
          <Input
            type="name"
            name="name"
            placeholder="Your Name"
            autoComplete="false"
            value={inputs.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="false"
            value={inputs.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {userState.userError && (
            <p style={{ color: "red" }}>{userState.userError}</p>
          )}

          <Button disabled={userState.userLoading}>
            {userState.userLoading ? <Spinner /> : "Register"}
          </Button>

          <div>
            Already have a account?{" "}
            <a onClick={() => setFormHandler("login")}>Log in here</a>
          </div>
        </form>
      </div>
    </RegisterStyled>
  );
}
