import React from 'react';

export default function Input({ value, onChange }) {
  return (
    <div>
      <input
        type="number"
        className="form-control mt-2 border border-primary"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

