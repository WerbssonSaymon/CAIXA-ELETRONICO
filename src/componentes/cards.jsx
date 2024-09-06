import React from "react";

export default function cards({label, onChange }) {
  return (
    <select onChange={onChange} 
    className="form-select">
      <option value="">{label}</option>
      <option value="rei">X</option>
      <option value="ás">X</option>
      <option value="2">X</option>
      <option value="3">X</option>
    </select>
  );
}
