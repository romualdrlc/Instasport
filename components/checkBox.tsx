import React, { useState } from "react";

const CheckBox: React.FC<any> = ({ id, active, setActive }) => {

  const [buttonSelected, setButtonSelected] = useState(active[id]);
  // const changementBox = (id) => {
  //   const result = active
  //   result[id] = true
  //   setActive(result);
  //   console.table(active)
  // };

  return (
    <>
      <button
        className= {buttonSelected ? "checkBox" : "checkBox2"}
        onClick={() => {
          const result = active
          console.log(result[id])
          result[id] = !result[id]
          setActive(result);
          setButtonSelected(!buttonSelected);
          console.table(active)
        }}
      >
        ok
      </button>
    </>
  );
};

export default CheckBox;
