import React from 'react';
import SearchTable from './BracketComponents/Search/SearchTable';
import East from "../../data/East.mjs";
import West from "../../data/West.mjs";
import "./style/Bracket.css"
import Tournament from "./BracketComponents/Tournament/Tournament"
import Login from "./BracketComponents/Inputs/Login"
import Random from "./BracketComponents/Inputs/Random"
import {useTheme} from "../ThemeContext"


function Bracket(){

    const playoff = useTheme()

    return(
        <div className = "bracket">
            <div className = "bracket-title">
                2023 NBA Playoff Bracket
            </div>
            <div className = "bracket-content">
                <div className = "bracket-search">
                    <SearchTable data = {East} count = {playoff["East"]} conf_data = {playoff["firstEast"]} conf = "East"/>
                    <SearchTable data = {West} count = {playoff["West"]} conf_data = {playoff["firstWest"]} conf = "West"/>
                </div>
                <div className = "bracket-tournament">
                    <Tournament />
                </div>
                <div className = "bracket-fetch">
                    <Login/>
                    <Random/>
                </div>
            </div>
        </div>
    )

}

export default Bracket;