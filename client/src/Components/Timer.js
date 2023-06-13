import {useEffect, useRef, useState} from "react";

export function Timer({ hasGameStarted, isGameOver }) {
    const [counter, setCounter] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (hasGameStarted && !isGameOver) {
            intervalRef.current = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);

            if (counter !== 0 && !isGameOver) {
                setCounter(0);
            }
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [hasGameStarted, isGameOver]);

    return (
        <span className={"game-info "}> Time: {counter} seconds</span>
    )
}