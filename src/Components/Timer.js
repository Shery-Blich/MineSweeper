import {useEffect, useState} from "react";

export function Timer({isGameRunning}) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (isGameRunning) {
            console.log(isGameRunning);
            setTimeout(() => setCounter(counter+1),1000);
        }
    },[isGameRunning, counter]);


    return (
        <span className={"game-info "}> Time: {counter} seconds</span>
    )
}