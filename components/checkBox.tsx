import React, { useState, useEffect } from "react";

const CheckBox: React.FC<any> = ({
  id,
  active,
  setActive,
  counterOfSelectedCategories,
  setCounterOfSelectedCategories
}) => {
  const [buttonSelected, setButtonSelected] = useState(active[id]);

  useEffect(() => {
  }, [buttonSelected]);
  return (
    <>
      <button
        className={buttonSelected ? "checkBoxActive" : "checkBoxInactive"}
        onClick={() => {
          const result = active;
          result[id] = !result[id];
          result[id]
            ? setCounterOfSelectedCategories(counterOfSelectedCategories + 1)
            : setCounterOfSelectedCategories(counterOfSelectedCategories - 1);
          setActive(result);
          setButtonSelected(!buttonSelected);
        }}
      >
        <div className="okTextCheckbox">ok</div>
      </button>
    </>
  );
};

export default CheckBox;
