import React from 'react';
import ReactDOM from "react-dom";
import './main.scss';
import {Game} from "./game.jsx";
import Sound from "react-sound";
let m = require('./sound/music.mp3');


class App extends React.Component {
    render() {
        return <div>
            <Sound
                    url={m}
                    playStatus={Sound.status.PLAYING}
                    playFromPosition={0 /* in milliseconds */}
                    loop={true}
            />
            <Game/>
        </div>
    }
}

ReactDOM.render(
    <div className="app-container">
        <App/>
    </div>,
    document.getElementById('app')
);
