import {Board} from "./Board";
import {useState} from "react";
import mineFieldManager from "../mineFieldManager";

export default function Game() {
    const [moves, setMoves] = useState(0);
    const [mineField, setMineField] = useState(new mineFieldManager(10));

    return (
        <div className="game">
            <div className="game-board">
                <Board setMoves={setMoves} moves={moves} mineField={mineField}/>
            </div>
        </div>
    );
}