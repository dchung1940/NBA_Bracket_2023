import React, { useContext, useState, useEffect } from "react";
import {addFirstRound,removeFirstRound,addRound,removeRound} from "./ThemeContextHelper"

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

function ThemeProvider(props) {

  // Global variable that updates all the changes
  const [playoff, setPlayoff] = useState({
    ID: "",
    East: 0,
    West: 0,
    firstEast: ["", "", "", "", "", "", "", ""],
    firstWest: ["", "", "", "", "", "", "", ""],
    quarterEast: ["", "", "", ""],
    quarterWest: ["", "", "", ""],
    semiEast: ["", ""],
    semiWest: ["", ""],
    finalEast: [""],
    finalWest: [""],
    Champion: [""],
  });

  // Updates the East Teams to the first round selected from the search table
  function updateEast(team, add) {
    if (add) {
      addFirstRound(setPlayoff,"firstEast", "East", team);
    } else {
      const array = ["firstEast", "quarterEast", "semiEast", "finalEast", "Champion"];
      removeFirstRound(setPlayoff,array, team, "East");
    }
  }

  // Updates the West Teams to the first round selected from the search table
  function updateWest(team, add) {
    if (add) {
      addFirstRound(setPlayoff,"firstWest", "West", team);
    } else {
      const array = ["firstWest", "quarterWest", "semiWest", "finalWest","Champion"];
      removeFirstRound(setPlayoff,array, team, "West");
    }
  }

  //Updates the first round East teams to the East quarter-final
  function updateQuarterEast(index, team) {
    let index_ = Math.floor(index / 2);
    const array = ["quarterEast", "semiEast", "finalEast", "Champion"];

    if (playoff["firstEast"][index] != playoff["quarterEast"][index_]) {
      addRound(setPlayoff,"quarterEast", index_, team, array);
    } else {
      removeRound(setPlayoff,index_, array, team);
    }
  }

  //Updates the first round West teams to the West quarter-final
  function updateQuarterWest(index, team) {
    let index_ = Math.floor(index / 2);
    const array = ["quarterWest", "semiWest", "finalWest", "Champion"];

    if (playoff["firstWest"][index] != playoff["quarterWest"][index_]) {
      addRound(setPlayoff,"quarterWest", index_, team, array);
    } else {
      removeRound(setPlayoff,index_, array, team);
    }
  }

  //Updates the quarter-final East teams to the East semi-final
  function updateSemiEast(index, team) {
    let index_ = Math.floor(index / 2);
    const array = ["semiEast", "finalEast", "Champion"];

    if (playoff["quarterEast"][index] != playoff["semiEast"][index_]) {
      addRound(setPlayoff,"semiEast", index_, team, array);
    } else {
      removeRound(setPlayoff,index_, array, team);
    }
  }

  //Updates the quarter-final West teams to the West semi-final
  function updateSemiWest(index, team) {
    let index_ = Math.floor(index / 2);
    const array = ["semiWest", "finalWest", "Champion"];

    if (playoff["quarterWest"][index] != playoff["semiWest"][index_]) {
      addRound(setPlayoff,"semiWest", index_, team, array);
    } else {
      removeRound(setPlayoff,index_, array, team);
    }
  }

  //Updates the semi-final East teams to the Final
  function updateFinalEast(index, team) {
    let index_ = Math.floor(index / 2);
    const array = ["finalEast", "Champion"];

    if (playoff["semiEast"][index] != playoff["finalEast"][index_]) {
      addRound(setPlayoff,"finalEast", index_, team, array);
    } else {
      removeRound(setPlayoff,index_, array, team);
    }
  }

  //Updates the semi-final West teams to the Final
  function updateFinalWest(index, team) {
    let index_ = Math.floor(index / 2);
    const array = ["finalWest", "Champion"];

    if (playoff["semiWest"][index] != playoff["finalWest"][index_]) {
      addRound(setPlayoff,"finalWest", index_, team, array);
    } else {
      removeRound(setPlayoff,index_, array, team);
    }
  }

  //Updates the Championship team
  function updateChampion(team) {
    if (playoff["Champion"][0] !== team) {
      setPlayoff((prevState) => ({ ...prevState, Champion: [team] }));
    } else {
      setPlayoff((prevState) => ({ ...prevState, Champion: [""] }));
    }
  }

  // useEffect(() => {
  //   console.log(playoff);
  // }, [playoff]);

  const fNames = [
    updateEast,
    updateWest,
    updateQuarterEast,
    updateQuarterWest,
    updateSemiEast,
    updateSemiWest,
    updateFinalEast,
    updateFinalWest,
    updateChampion,
    setPlayoff,
  ]

  return (
    <ThemeContext.Provider value={playoff}>
      <ThemeUpdateContext.Provider value={fNames}>
        {props.children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

export { useTheme, useThemeUpdate, ThemeProvider };
