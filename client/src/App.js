import logo from './logo.svg';
import './App.css';
import Game from "./Components/Game";
import axios from "axios";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:3080";

function App() {
    const [mineField, setMineField] = useState({mine: [], bombs: []});
    const [allLinkedSquares, setAllLinkedSquares] = useState([]);

    useEffect(() => {
        createGame();
    }, []);

    const client = axios.create({
        baseURL: baseURL,
        withCredentials: true,
    });

    const createGame = (size = 10) => {
        client.post(`/minefield`, { size: size })
            .then((response) => {
                setMineField({mine: response.data.mine, bombs: response.data.bombs});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllLinkedSquares = (i) => {
        client.post(`/linkedSquares/${i}`, {
            mineField: {
                mine: mineField.mine,
                bombs: mineField.bombs
            }
        })
            .then((response) => {
                setAllLinkedSquares(response.data.allLinked);
            })
            .catch((error) => {
                console.log(error);
            });
    };

        return (
        <div className="App">
            <header className="header">
                <img src={logo} className="App-logo" alt="logo" />
                MineSweeper
            </header>
            <div className="App-header">
                <Game mineField={mineField} getAllLinkedSquares={getAllLinkedSquares} linkedSquares = {allLinkedSquares} />
            </div>
        </div>
    );
}

export default App;
