import {Board} from "./Board";
import {useState} from "react";

export default function Game() {
    const [moves, setMoves] = useState(0);

    return (
        <div className="game">
            <div className="game-board">
                <Board setMoves={setMoves} moves={moves}/>
            </div>
        </div>
    );
}