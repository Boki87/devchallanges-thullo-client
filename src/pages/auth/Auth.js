import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const [formType, setFormType] = useState("login");

  return (
    <>
      {formType === "login" ? (
        <Login setFormHandler={setFormType} />
      ) : (
        <Register setFormHandler={setFormType} />
      )}
    </>
  );
}
