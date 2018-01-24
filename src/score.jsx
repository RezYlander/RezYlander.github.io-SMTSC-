import React from 'react';
import {Game} from "./game.jsx";

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
                <div>
                    <h1>
                        SCORE
                    </h1>
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