import {useEffect, useState} from "react";

export function Timer({isGameRunning}) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (isGameRunning) {
            // set interval instead of set timeout
            setTimeout(() => setCounter(counter => counter + 1),1000);
        }
    },[isGameRunning, counter]);


    return (
        <span className={"game-info "}> Time: {counter} seconds</span>
    )
}