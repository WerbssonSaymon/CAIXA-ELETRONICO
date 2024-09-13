import React from "react";

export default function buttonGame({ label, onClick }) {
  return (
    <button
      className="w-100 btn btn-lg btn-primary text-uppercase border border-5 border-light mt-2"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
