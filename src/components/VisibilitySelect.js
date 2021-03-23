import React from "react";
import Select from "./Select";

export default function VisibilitySelect({ onChange }) {
  return (
    <Select
      onChange={onChange}
      icon={<span className="material-icons">lock</span>}
      options={["Private", "Public"]}
    />
  );
}
