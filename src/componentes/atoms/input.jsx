import React from 'react';

export default function Input({type, value, onChange }) {
  return (
    <div>
      <input
        type={type}
        className="form-control border border-primary"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

