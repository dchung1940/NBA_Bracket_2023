import React,{useState} from "react";
import "./style/Random.css"

function Random () {

    const [rand,setRand] = useState("Click To Generate");
    

    function buttonHandler(){
        setRand(()=>(makeid(6)))
    }

    return(
        <div className = "random">
            <div className = "random-number">{rand}</div>
            <button onClick = {buttonHandler}>Random</button>
        </div>
    )
}

// Create random ID 
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default Random;