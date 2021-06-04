import React, { useState } from "react";

const CheckBox: React.FC<any> = ({ id, active, setActive }) => {

  const [buttonSelected, setButtonSelected] = useState(active[id]);

  return (
    <>
      <button
        className= {buttonSelected ? "checkBox" : "checkBox2"}
        onClick={() => {
          const result = active
          result[id] = !result[id]
          setActive(result);
          setButtonSelected(!buttonSelected);
        }}
      >
        ok
      </button>
    </>
  );
};

export default CheckBox;
