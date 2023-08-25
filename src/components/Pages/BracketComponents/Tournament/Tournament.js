import React from "react";
import "./style/Tournament.css";
import Teams from "./Teams";
import Champion from "./Champion";
import {useTheme} from "../../../ThemeContext"


function Tournament() {

  const playoff = useTheme()

  return (
    <div className="tournament">
      <div className="tournament-teams">
        <div className="tournament-teams-firstEast">
          <Teams data={playoff["firstEast"]} conf = "firstEast" />
        </div>
        <div className="tournament-teams-quarterEast">
          <Teams data={playoff["quarterEast"]} conf = "quarterEast"/>
        </div>
        <div className="tournament-teams-semiEast">
          <Teams data={playoff["semiEast"]} conf = "semiEast"/>
        </div>
        <div className="tournament-teams-championship">
          <div className="wrapper">
            <div className="tournament-teams-finals">
              <div className="tournament-teams-final-East">
                <Teams data={playoff["finalEast"]} conf = "finalEast"/>
              </div>
              <div className="tournament-teams-final-West">
                <Teams data={playoff["finalWest"]} conf = "finalWest"/>
              </div>
            </div>
            <Champion champion = {playoff["Champion"][0]}/>
          </div>
        </div>
        <div className="tournament-teams-semiWest">
          <Teams data={playoff["semiWest"]} conf = "semiWest"/>
        </div>
        <div className="tournament-teams-quarterWest">
          <Teams data={playoff["quarterWest"]} conf = "quarterWest"/>
        </div>
        <div className="tournament-teams-firstWest">
          <Teams data={playoff["firstWest"]} conf = "firstWest"/>
        </div>
      </div>
    </div>
  );
}

export default Tournament;
