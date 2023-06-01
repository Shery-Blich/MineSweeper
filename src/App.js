import logo from './logo.svg';
import './App.css';
import Game from "./Components/Game";

function App() {

    return (
        <div className="App">
            <header className="header">
                <img src={logo} className="App-logo" alt="logo" />
                MineSweeper
            </header>
            <div className="App-header">
                <Game/>
            </div>
        </div>
    );
}


export default App;
