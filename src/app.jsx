import React from 'react';
import ReactDOM from "react-dom";
import './main.scss';
import {Game} from "./game.jsx";


class App extends React.Component {
    render() {
        return <Game/>
    }
}

ReactDOM.render(
    <div className="app-container">
        <App/>
    </div>,
    document.getElementById('app')
);
