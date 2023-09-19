import React from 'react'
import "./style/Champion.css"
import Image from "../../../../data/Images.mjs"


function Champion({champion}){
    return(
        <div className = "champion">
            <img src = {Image[champion][1]} alt = {Image[champion][0]}/>
            <span>{champion}</span>
        </div>
    )
}

export default Champion