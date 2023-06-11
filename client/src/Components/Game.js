import {Board} from "./Board";
import {useState} from "react";

export default function Game({mineField, getAllLinkedSquares, linkedSquares}) {
    const [moves, setMoves] = useState(0);

    return (
        <div className="game">
            <div className="game-board">
                <Board setMoves={setMoves} moves={moves} mineField={{mine: mineField.mine, bombs: mineField.bombs}} getAllLinkedSquares={getAllLinkedSquares}
                       linkedSquares = {linkedSquares}
                />
            </div>
        </div>
    );
}