import React from "react"
import Team from "./Team"
import Images from "../../../../data/Images.mjs"
import "./style/Teams.css"

function Teams({data,conf}){

    return(
        <div className = "teams">
            {
                data.map((data,index)=>(
                    <Team 
                    key = {index}
                    index = {index}
                    name = {data}
                    nickname = {Images[data][0]}
                    image = {Images[data][1]}
                    conf = {conf}
                    />
                ))
            }
        </div>
    )

}

export default Teams