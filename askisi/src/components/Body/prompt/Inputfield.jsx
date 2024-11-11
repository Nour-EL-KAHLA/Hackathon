import React from "react";

function Inputfield({ name }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className={`lock text-xl font-bold  capitalize`}>
          {name}
        </label>
      </div>
      <div className="mt-2"></div>
    </div>
  );
}

export default Inputfield;
