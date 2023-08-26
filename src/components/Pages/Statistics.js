import React from "react";
import East from "../../data/East.mjs";
import West from "../../data/West.mjs";
import "./style/Statistics.css";

function Statistics() {

  function Team(data) {
    // outputting team data for each conference
    return data.map((props,index) => (
      <tr key = {index}>
        <td>
          <img src={props.team.logo} alt = {props.team.name}></img>
          {props.conference.rank + " " + props.team.name}
        </td>
        <td>{props.win.total}</td>
        <td>{props.loss.total}</td>
        <td>{props.win.percentage}</td>
        <td>{props.gb}</td>
        <td>{props.win.home + ":" + props.loss.home}</td>
        <td>{props.win.away + ":" + props.loss.away}</td>
      </tr>
    ));
  }

  return (
    <div className = "statistics">
      <h1>2021 - 2022 Season Stats</h1>
      <table className="content-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>Win%</th>
            <th>GB</th>
            <th>Home</th>
            <th>Road</th>
          </tr>
        </thead>
        <tbody>{Team(East)}</tbody>
      </table>

      <table className="content-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>Win%</th>
            <th>GB</th>
            <th>Home</th>
            <th>Road</th>
          </tr>
        </thead>
        <tbody>
          {Team(West)}
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
