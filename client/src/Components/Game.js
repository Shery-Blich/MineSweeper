import {Board} from "./Board";
import {useState} from "react";
import {Timer} from "./Timer";
import TextField from '@mui/material/TextField';


export default function Game({mineField, getAllLinkedSquares, linkedSquares, createGame}) {
    const initialStateMoves = 0;
    const [moves, setMoves] = useState(initialStateMoves);
    const [isGameOver, setIsGameOver] = useState(false);
    const [size, setSize] = useState(mineField.size);
    const [bombCount, setBombCount] = useState(10);

    const handleCreateGame = () => {
        if (!size || size < 5 || size > 12) {
            alert("For the Mine Size, Please enter a number between 5 and 12");

            return;
        }

        if (bombCount >= size * 2 || bombCount < size / 2 ) {
            alert(`For the Bombs, Please enter a number between ${Math.floor(size/2)} and ${size * 2}`);

            return;
        }

        if (isGameOver) {
            setIsGameOver(prev => !prev);
        }

        if (moves > initialStateMoves) {
            setMoves(initialStateMoves);
        }

        createGame(size, bombCount);
    }


    return (
        <div className="game">
            <button style={{background:"#239dcb", minHeight: "5vh",minWidth: "5vh"}} onClick={handleCreateGame} className="restart">Restart Game</button>
            <div style={{background:"mistyrose"}}>
                <TextField style={{background:"pink"}}  onChange={(e) => setSize(parseInt(e.target.value))}
                           label={'Mine Size'} placeholder={mineField.size.toString()} margin={"normal"} />
                <TextField style={{background:"tomato"}} onChange={(e) => setBombCount(parseInt(e.target.value))}
                           label={'Bombs'} placeholder={mineField.bombs.length.toString()} margin={"normal"} />
            </div>
            <Timer hasGameStarted={moves > 0} isGameOver={isGameOver}/>
            <div className="game-board">
                <Board setMoves={setMoves} moves={moves} mineField={mineField} getAllLinkedSquares={getAllLinkedSquares} setIsGameOver={setIsGameOver} isGameOver={isGameOver}
                       linkedSquares = {linkedSquares}
                />
            </div>
        </div>
    );
}