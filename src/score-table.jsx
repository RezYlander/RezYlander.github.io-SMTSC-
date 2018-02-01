import React from 'react';

export class HighScoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersArr: [],
        }
    }


    componentDidMount() {

        fetch('http://localhost:3000/players')
            .then((resp) => resp.json())
            .then((resp) => {
                this.setState({
                    playersArr: resp
                })
            });
    }

    render() {

        return (
            <table className="score-table">
                <tbody>
                    {this.state.playersArr.sort((a,b)=>{
                    return b.score - a.score
                    }).slice(0,10).map((player) => {
                    return (
                        <tr key={player.score}>
                            <th style={{textAlign: "left"}}>{player.name}</th>
                            <th style={{paddingLeft: "20px"}}>{player.score}</th>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        )
    }
}