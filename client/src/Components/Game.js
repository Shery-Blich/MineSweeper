import {Board} from "./Board";
import {useRef, useState} from "react";
import {Timer} from "./Timer";

export default function Game({mineField, getAllLinkedSquares, linkedSquares, createGame}) {
    const initialStateMoves = 0;
    const [moves, setMoves] = useState(initialStateMoves);
    const [isGameOver, setIsGameOver] = useState(false);
    const inputRef = useRef(null);

    const handleCreateGame = () => {
        const newSize = parseInt(inputRef.current.value);

        if (!newSize || newSize < 2 || newSize > 15) {
            alert("Please enter a number between 2 and 15");

            return;
        }

        if (isGameOver) {
            setIsGameOver(prev => !prev);
        }

        if (moves > initialStateMoves) {
            setMoves(initialStateMoves);
        }

        createGame(newSize);
    }


    return (
        <div className="game">
            <button onClick={handleCreateGame}>Restart Game</button>
            <input ref={inputRef}/>
            <Timer hasGameStarted={moves > 0} isGameOver={isGameOver}/>
            <div className="game-board">
                <Board setMoves={setMoves} moves={moves} mineField={mineField} getAllLinkedSquares={getAllLinkedSquares} setIsGameOver={setIsGameOver} isGameOver={isGameOver}
                       linkedSquares = {linkedSquares}
                />
            </div>
        </div>
    );
}