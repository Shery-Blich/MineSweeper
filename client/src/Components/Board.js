import {Square} from "./Square";
import {useEffect, useState} from "react";
import {Timer} from "./Timer";

let wasBombedClicked = false;
// pass setState for information to the player timer
// restart button in game?
// + You should always start from zero
export function Board({setMoves, moves, mineField, getAllLinkedSquares, linkedSquares}) {
    const [squares, setSquares] = useState([])
    let isVictory = mineField.mine.length - howManyClicked() === mineField.bombs.length;
    let isGameRunning = moves > 0;

    if (isVictory || wasBombedClicked) {
        isGameRunning = false;
        showAllBombs();
    }

    // this runs on every change to linked squares
    useEffect(() => {
        if (linkedSquares.length > 0) {
            linkedSquares.forEach((index) => {
                const squareValue = mineField.mine[index];
                squares[index] = squareValue === 0 ? ' ' : squareValue;
            });

            setSquares(prevSquares => [...prevSquares]);
        }
    }, [linkedSquares]);

    // this use effect only runs when first rendering
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault()
        }

        const board = document.querySelector(".board");
        board.addEventListener("contextmenu", handleContextMenu)

        // What's purpose?
        // Clean up after the component unmounts, in order to prevent memory leaks
        // also triggered when the dependent component changes(not this case, but in timer yes.)
        return () => {
            board.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [])

    function isSquareNotClickable(i) {
        if (wasBombedClicked || isVictory) {
            return true;
        }

        if (squares[i] === 'B') {
            return false;
        }

        return squares[i] !== undefined && squares[i] !== null;
    }


    function handleRightClick(i) {
        if(isSquareNotClickable(i)) {
            return;
        }

        if (squares[i] === 'B') {
            squares[i] = null
        } else {
            squares[i] = 'B';
        }

        setSquares(squares.slice());
    }

    function showAllBombs() {
        mineField.bombs.forEach((index) => {
            squares[index] = -1;
        });
    }

    function howManyClicked() {
        let counter = 0;

        squares.forEach((square) => {
            if (square !== 'B' && square !== null && square !== undefined  && square !== -1) {
                counter++;
            }
        });

        return counter;
    }

    function handleClick(i) {
        if(isSquareNotClickable(i)) {
            return;
        }

        setMoves(moves => moves + 1);

        if (mineField.bombs.includes(i)) {
            wasBombedClicked = true;
        }
        else if (mineField.mine[i] === 0) {
            getAllLinkedSquares(i);
        } else {
            squares[i] = mineField.mine[i];
        }

        setSquares(prevSquares => [...prevSquares]);
    }


    const board = [];

    for (let i = 0; i < 10; i++) {
        const squaresInRow = [];

        for (let j = 0; j < 10; j++) {
            const squareIndex = i * 10 + j;
            squaresInRow.push(
                <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                    highlight={wasBombedClicked || isVictory}
                    onRightClick={() => handleRightClick(squareIndex)}
                />
            );
        }

        board.push(
            <div key={i} className="board-row">
                {squaresInRow}
            </div>
        );
    }

    // move status to game when there is backend
    function getStatus() {
        if (isVictory) {
            return `You Won! in ${moves} moves! Impressive ;)`;
        }

        if (wasBombedClicked) {
            return "You lost! killed everyone inside the mine! :("
        }

        return `There are ${mineField.bombs.length} Mines, you made ${moves} moves`;
    }

    return (
        <div className="board">
            <Timer isGameRunning={isGameRunning}/>
            <div className={isVictory ? "status-won" : wasBombedClicked ? "status-lost" : "status"}>{getStatus()}</div>
            {board}
        </div>
    );
}