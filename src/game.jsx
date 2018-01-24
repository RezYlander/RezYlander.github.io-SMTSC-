import React from 'react';
import ReactDOM from 'react-dom';
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
                <div>
                    <GameTitle/>
                    <ul>
                        <li><button onClick={this.handleNewGame}>Start Game</button></li>
                        <li><button onClick={this.handleScore}>High Score</button></li>
                    </ul>
                </div>
            )
        } else if(this.state.view == "popup") {
            return (
                <div>
                    <ul>
                        <li>
                            <form onSubmit={this.handleSubmit}>
                                <label>{this.state.info}<input onChange={this.handleInputChange} type="text" value={this.state.user}/></label>
                                <button type="submit">Utwórz ciecia</button>
                            </form>
                        </li>
                    </ul>
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