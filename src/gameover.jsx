import React from 'react';
import {Game} from "./game.jsx";
import {GameHighScore} from "./score.jsx";

export class GameOver extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            view: "gameover",
            user: this.props.playerName
        }
    }

    handleBackToMenu =()=>{
      this.setState({
          view: "menu"
      })
    };
    handleHighScore =()=>{
        this.setState({
            view: "score"
        })
    };
    componentDidMount(){
        console.log(this.props.playerName)
    }

    render() {
        if (this.state.view === "gameover") {
            return (
                <div className="gameover-container">
                    <div className="text-effect">
                        <h1 className="neon small" data-text="game over">Game Over</h1>
                        <div className="gradient"/>
                        <div className="spotlight"/>
                    </div>
                    <span>{this.props.playerName}</span>
                    <span>{this.props.playerScore}</span> punktów
                    <button onClick={this.handleBackToMenu}>Wróć do menu</button>
                    <button onClick={this.handleHighScore}>High Score</button>
                </div>
            )
        } else if (this.state.view === "menu"){
            return (
                <Game/>
            )
        } else if (this.state.view === "score"){
            return (
                <GameHighScore/>
            )
        }
    }
}