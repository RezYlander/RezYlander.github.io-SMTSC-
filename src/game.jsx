import React from 'react';
import Sound from 'react-sound';
import {Board} from "./board.jsx";
import {GameTitle} from "./game-title.jsx";
import {GameHighScore} from "./score.jsx";

export class Game extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: "",
            view: "start",
            info: "Podaj imię pilota przegrywa "
        }
    }

    handleNewGame = (e) => {
        this.setState({
            view: "popup"
        })
    };

    handleScore = (e) => {
        this.setState({
            view: "score"
        })
    };

    handleInputChange = (e) => {
        this.setState({
            user: e.currentTarget.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.user)
        {
            this.setState({
                info: 'No weź, że podaj no... '
            })
        } else {
            this.setState({
                view: "board"
            })
        }


    };
    render(){

        if(this.state.view == "start")
        {
            return (
                <div className="game-menu-container">
                    <div className="game-menu-title">
                        <GameTitle/>
                    </div>
                    <div className="game-menu-buttons-container">
                        <ul className="game-menu-buttons-list">
                            <li><button onClick={this.handleNewGame}>Start Game</button></li>
                            <li><button onClick={this.handleScore}>High Score</button></li>
                        </ul>
                    </div>
                </div>
            )
        } else if(this.state.view == "popup") {
            return (
                <div className="player-container">
                    <form onSubmit={this.handleSubmit} className="player-form">
                        <label>
                            <div className="text-effect">
                                <h1 className="neon small" data-text={this.state.info}>{this.state.info}</h1>
                                <div className="gradient"/>
                                <div className="spotlight"/>
                            </div>
                        </label>
                        <input onChange={this.handleInputChange} type="text" value={this.state.user}/>
                        <button type="submit">Graj!</button>
                    </form>
                </div>
            )
        } else if (this.state.view == "score") {
            return (
                <GameHighScore/>
            )

        } else if(this.state.view == "board"){
            return (
                <Board playerName={this.state.user}/>
            )
        }
    }
}