import React from 'react';
import {Game} from "./game.jsx";
import {HighScoreTable} from "./score-table.jsx";

export class GameHighScore extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            view: "score"
        }
    }

    handleBackToMenu =()=>{
        this.setState({
            view: "menu"
        })
    };

    render(){
        if (this.state.view === "score"){
            return (
                <div className="score-container">
                    <div className="text-effect">
                        <h1 className="neon small" data-text="High Score">High Score</h1>
                        <div className="gradient"/>
                        <div className="spotlight"/>
                    </div>
                    <HighScoreTable/>
                    <button onClick={this.handleBackToMenu}>Wróć do menu</button>
                </div>
            )
        } else if (this.state.view === "menu"){
            return (
                <Game/>
            )
        }
    }
}