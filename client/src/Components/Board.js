import {Square} from "./Square";
import {useEffect, useState} from "react";

let wasBombedClicked = false;
let isVictory = false;

export function Board({setMoves, moves, mineField, getAllLinkedSquares, linkedSquares, setIsGameOver, isGameOver}) {
    const [squares, setSquares] = useState([])

    if (isGameOver) {
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


    // Triggers on every change to mine(meaning game was restarted)
    useEffect(() => {
        wasBombedClicked = false;
        isVictory = false;
        setSquares([]);
    }, [mineField.mine]);

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault()
        }

        const board = document.querySelector(".board");
        board.addEventListener("contextmenu", handleContextMenu)

        // What's purpose?
        // Clean up after the component unmounts, in order to prevent memory leaks
        return () => {
            board.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [])

    function isSquareNotClickable(i) {
        if (isGameOver) {
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
            setIsGameOver(prev => !prev);
        }
        else if (mineField.mine[i] === 0) {
            getAllLinkedSquares(i);
        } else {
            squares[i] = mineField.mine[i];
        }

        setSquares(prevSquares => [...prevSquares]);

        if (mineField.mine.length - howManyClicked() === mineField.bombs.length) {
            isVictory = true;
            setIsGameOver(prev => !prev);
        }
    }


    const board = [];

    for (let i = 0; i < mineField.size; i++) {
        const squaresInRow = [];

        for (let j = 0; j < mineField.size; j++) {
            const squareIndex = i * mineField.size + j;
            squaresInRow.push(
                <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                    highlight={isGameOver}
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
            <div className={isVictory ? "status-won" : wasBombedClicked ? "status-lost" : "status"}>{getStatus()}</div>
            {board}
        </div>
    );
}