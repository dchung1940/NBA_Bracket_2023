import {Converter} from './File_Converter.mjs';
import Standings from './Standings.mjs';
import East from "./East.mjs";
import West from "./West.mjs"

// const standings = Standings.response;

// function myfunction(a,b){
//     return a.conference.rank - b.conference.rank;
// }

// let teams = standings.map((props)=>(
//     {
//         team:props.team,
//         conference:props.conference,
//         win: props.win,
//         loss: props.loss,
//         gb:props.gamesBehind
//     }
// ))
// let East = teams.filter((props)=>(props.conference.name == "east"));
// let West = teams.filter((props)=>(props.conference.name == "west"));
// East.sort(myfunction)
// West.sort(myfunction)

let Images = {}
for (let i = 0; i<East.length;++i){
    let element = East[i]
    Images[element["team"]["name"]] = [element["team"]["code"],element["team"]["logo"]]
}

for (let i = 0; i<West.length;++i){
    let element = West[i]
    Images[element["team"]["name"]] = [element["team"]["code"],element["team"]["logo"]]
}

// Converter(East,"East.mjs")
// Converter(West,"West.mjs")
Converter(Images,"Images.mjs")