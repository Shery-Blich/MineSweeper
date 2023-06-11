import {Board} from "./Board";
import {useState} from "react";
import {Timer} from "./Timer";

export default function Game({mineField, getAllLinkedSquares, linkedSquares}) {
    const [moves, setMoves] = useState(0);
    const [isCurrGameRunning, setIsCurrGameRunning] = useState(false);

    return (
        <div className="game">
            <button>Restart Game</button>
            <textarea>MineSize:</textarea>
            <textarea>Mines:</textarea>
            <Timer isGameRunning={isCurrGameRunning}/>
            <div className="game-board">
                <Board setMoves={setMoves} moves={moves} mineField={mineField} getAllLinkedSquares={getAllLinkedSquares} setIsCurrGameRunning={setIsCurrGameRunning}
                       linkedSquares = {linkedSquares}
                />
            </div>
        </div>
    );
}