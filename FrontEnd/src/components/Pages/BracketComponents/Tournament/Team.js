import React from 'react'
import {useThemeUpdate} from "../../../ThemeContext"

import "./style/Team.css"

function Team(props){
    const [
        updateEast,
        updateWest,
        updateQuarterEast,
        updateQuarterWest,
        updateSemiEast,
        updateSemiWest,
        updateFinalEast,
        updateFinalWest,
        updateChampion,
        setPlayoff
      ] = useThemeUpdate()

    function clickHandler(){

        if(props.conf === "firstEast"){
            updateQuarterEast(props.index,props.name)
        }
        else if (props.conf === "firstWest"){
            updateQuarterWest(props.index,props.name)
        }
        else if (props.conf === "quarterEast"){
            updateSemiEast(props.index,props.name)
        }
        else if (props.conf === "quarterWest"){
            updateSemiWest(props.index,props.name)
        }
        else if (props.conf === "semiEast"){
            updateFinalEast(props.index,props.name)
        }
        else if (props.conf === "semiWest"){
            updateFinalWest(props.index,props.name)
        }
        else if (props.conf === "finalEast" || props.conf === "finalWest")
        {
            updateChampion(props.name)
        }
    }
    

    return(
        <div className = {"team"} onClick = {clickHandler}>
            
            <img src = {props.image} alt = {props.name}/> 
            <span>{props.nickname}</span>
            
        </div>
    )
}

export default Team