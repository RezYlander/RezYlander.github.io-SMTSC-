import React from 'react';

export class HighScoreTable extends React.Component {

    getPlayers =()=> {
        fetch('http://localhost:3000/players')
            .then( resp => {
                return resp.json();
            }).then( respond => {
            const players = respond;
            console.log(players)
        })
    };

    getPlayersNames =()=> {
        fetch('http://localhost:3000/players')
            .then( resp => {
                return resp.json();
            }).then( respond => {
            const playersNames = respond.map(element=>{
                return element.Name
            });
            console.log(playersNames)
        })
    };

    getPlayersScore =()=> {
        fetch('http://localhost:3000/players')
            .then( resp => {
                return resp.json();
            }).then( respond => {
                const playersScores = respond.map(element=>{
                    return element.Score
            });
            console.log(playersScores)
        })
    };

    render(){
        const playersScores = this.getPlayersScore();
        const playersNames = this.getPlayersNames();
        const players = this.getPlayers();
        return (
            <div className="score-table">
                <h1>HIGH SCORE</h1>
            </div>
        )
    }
}