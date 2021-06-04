import React, { useState } from "react";

const CheckBox: React.FC<any> = ({ id, active, setActive }) => {
  // const changementBox = (id) => {
  //   const result = active
  //   result[id] = true
  //   setActive(result);
  //   console.table(active)
  // };

  return (
    <>
      <button
        className="checkBox"
        onClick={() => {
          const result = active;
          console.log(result[id]);
          result[id] = !result[id];
          setActive(result);
          console.table(active);
        }}
      >
        ok
      </button>
    </>
  );
};

export default CheckBox;
