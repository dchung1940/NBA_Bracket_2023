import React, { useState, useEffect } from "react";
import "./style/TableEntry.css";
import { useThemeUpdate } from "../../../ThemeContext";

function TableEntry(props) {
  const [clicked,setClicked] = useState(false)
  const [updateEast, updateWest, ...rest] = useThemeUpdate();


  // ? Are we supposed to destructure props for useEffect? React gives me warning for this
  // https://stackoverflow.com/questions/55228102/is-not-including-all-dependencies-in-the-useeffect-dependency-array-an-anti-patt
  useEffect(()=>{
    if (props.conf_data.includes(props.name)){
        setClicked(true)
      }
      else{
        setClicked(false)
      }
  },[props.conf_data])
  


  function clickHandler() {
    if (props.count >= 8 && !clicked) {
        // Do nothing as count is already at 8
    } else {
      if (clicked) {
        if (props.conf === "East") {
          updateEast(props.name, false);
        } else {
          updateWest(props.name, false);
        }
        setClicked(false)
      } else {
        if (props.conf === "East") {
          updateEast(props.name, true);
        } else {
          updateWest(props.name, true);
        }
        setClicked(true)
      }
    }
  }

  return (
    <div
      className={"entry" + (clicked ? " clicked" : "")}
      onClick={clickHandler}
    >
      <img src={props.image} alt = {props.name}/>
      <span>{props.name}</span>
    </div>
  );
}

export default TableEntry;
