import React, { useState, useEffect } from "react";

const CheckBox: React.FC<any> = ({ id, active, setActive, atLeastThreeCategoriesSelected, setAtLeastThreeCategoriesSelected }) => {

  const [buttonSelected, setButtonSelected] = useState(active[id]);
  //const [atLeastThreeCategoriesSelected, setAtLeastThreeCategoriesSelected] = useState(false);
  // const changementBox = (id) => {
  //   const result = active
  //   result[id] = true
  //   setActive(result);
  //   console.table(active)
  // };
  useEffect(() => {
    console.log("tati");
    let counterOfSelectedCategories=0;
    active.forEach((isCategorySelected) => isCategorySelected ? counterOfSelectedCategories=counterOfSelectedCategories+1 : null)
    console.log("------------counterOfSelectedCategories------------",counterOfSelectedCategories );
    setAtLeastThreeCategoriesSelected(counterOfSelectedCategories > 2); // & birthdate != ""
    console.log("------------atLeastThreeCategoriesSelected--------------------",atLeastThreeCategoriesSelected);
    

}, [buttonSelected]);
  return (
    <>
      <button
        className= {buttonSelected ? "checkBoxActive" : "checkBoxInactive"}
        onClick={() => {
          const result = active
          console.log("******************",result[id])
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
