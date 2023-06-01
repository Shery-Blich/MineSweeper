import {Square} from "./Square";
import {useEffect, useState} from "react";
const bombs = new Set(Array.from({length: 10}, () => Math.floor(Math.random() * 100)));
const mine = Array(100).fill(0)

for (let i = 0; i < 10; i++) {
     for (let j = 0; j < 10; j++) {
         const index = i * 10 + j;
         mine[index] = countNearbyBombs(index);
     }
 }

function countNearbyBombs(index) {
    const neighbors = getNeighbors(index);
    let counter = 0;

    neighbors.forEach((neighbor) => {
        if (isBomb(neighbor)) {
            counter++;
        }
    })

    return counter;
}

function getNeighbors(i) {
    let neighbors = [];

    if (i - 10 > 0) {
        const up = i - 10;
        neighbors.push(up);
    }

    if (i + 10 < mine.length) {
        const down = i + 10;
        neighbors.push(down);
    }

    if (i % 10 !== 0) {
        const left = i - 1;
        const upLeft = i - 11;
        const downLeft = i + 9;

        neighbors.push(left);
        neighbors.push(upLeft);
        neighbors.push(downLeft);
    }

    if (i%10 !== 9) {
        const right = i + 1;
        const upRight = i - 9;
        const downRight = i + 11;

        neighbors.push(right);
        neighbors.push(upRight);
        neighbors.push(downRight);
    }

    return neighbors;
}
 function isBomb(i) {
     return bombs.has(i) ? 1 : 0;
 }

function getAllLinkedZeros(i, copiedMine, linkedZeros) {
     if (i < 0 || copiedMine.length <= i) {
         return [];
     }

     if (copiedMine[i] !== 0) {
         if (copiedMine[i] === -1) {
             return [];
         }

         return [i];
     }

     linkedZeros = [i];
     copiedMine[i] = -1;
     const neighbors = getNeighbors(i);

     neighbors.forEach((neighbor) => {
         linkedZeros.push(...getAllLinkedZeros(neighbor,copiedMine));
    });

     return linkedZeros;
}

let wasBombedClicked = false;

export function Board({squares, onPlay}) {
    const [moves, setMoves] = useState(0);
    let isVictory = mine.length - howManyClicked() === bombs.size;
    if (isVictory) {
        showAllBombs();
    }

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault()
        }

        document.addEventListener("contextmenu", handleContextMenu)

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
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
        }
        else {
            squares[i] = 'B';
        }

        const nextSquares = squares.slice();
        onPlay(nextSquares);
    }

    function showAllBombs() {
        bombs.forEach((index) => {
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

        setMoves(moves + 1);

        if (bombs.has(i)) {
            wasBombedClicked = true;
            showAllBombs();
        }
        else if (mine[i] === 0) {
            const linkedZeros = new Set(getAllLinkedZeros(i, mine.slice()));

            linkedZeros.forEach((index) => {
                squares[index] = mine[index];
            });
        }
        else {
            squares[i] = mine[i];
        }



        const nextSquares = squares.slice();
        onPlay(nextSquares);
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

    function getStatus() {
        if (isVictory) {
            return `You Won! in ${moves} moves! Impressive ;)`;
        }

        if (wasBombedClicked) {
            return "You lost! killed everyone inside the mine! :("
        }

        return `There are ${bombs.size} Mines, you made ${moves} moves`;
    }

    return (
        <>
            <div className="status">{getStatus()}</div>
            {board}
        </>
    );
}