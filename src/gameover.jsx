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
                <h1>
                    GAMEOVER
                    <button onClick={this.handleBackToMenu}>Wróć do menu</button>
                    <button onClick={this.handleHighScore}>High Score</button>
                </h1>
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