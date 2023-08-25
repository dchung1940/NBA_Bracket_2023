import React, { useState, useEffect } from "react";
import "./style/TableEntry.css";
import { useTheme, useThemeUpdate } from "../../../ThemeContext";

function TableEntry(props) {
  const [clicked,setClicked] = useState(false)
  const [updateEast, updateWest, ...Rest] = useThemeUpdate();

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
        if (props.conf == "East") {
          updateEast(props.name, false);
        } else {
          updateWest(props.name, false);
        }
        setClicked(false)
      } else {
        if (props.conf == "East") {
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
      <img src={props.image} />
      <span>{props.name}</span>
    </div>
  );
}

export default TableEntry;
