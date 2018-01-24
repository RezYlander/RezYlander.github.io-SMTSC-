import React from 'react';
import {GameOver} from "./gameover.jsx";


var ship = require('./img/ship-small.png');
var comet = require('./img/metor-small.png');

export class Board extends React.Component {
    constructor(props) {
        const cometDefaultX = Math.floor(Math.floor(Math.random()*(1150-50+1)+50));
        const cometDefaultY = Math.floor(Math.floor(Math.random()*(700-50+1)+50));

        super(props);
        this.state = {
            view: "board",
            shipY: 350,
            cometX: cometDefaultX,
            cometY: cometDefaultY,
        }
    }
    componentDidMount() {
        const ctx = this.refs.canvas.getContext('2d');
        const ship = this.refs.ship;
        const comet = this.refs.comet;

        ship.onload = () => {
            ctx.drawImage(ship, 50, this.state.shipY)
        };
        window.onkeydown = (e) =>{
            switch (e.keyCode) {
                case 37:
                    break;
                case 38:
                    if(this.state.shipY>=50) {
                        this.setState({
                            shipY: this.state.shipY - 50
                        });
                        ctx.clearRect(50,this.state.shipY+50, 50, 50);
                    }
                    console.log(this.state.shipY);
                    break;
                case 39:
                    break;
                case 40:
                    if(this.state.shipY<700) {
                        this.setState({
                            shipY: this.state.shipY + 50
                        });
                        ctx.clearRect(50,this.state.shipY-50, 50, 50);
                    }
                    console.log(this.state.shipY);
                    break;
            }
            ctx.drawImage(ship, 50, this.state.shipY);
        };

        comet.onload = () => {
            ctx.drawImage(comet, this.state.cometX, this.state.cometY )
        };
        this.cometsIntervalId = setInterval(()=>{
            this.setState({
                cometX: this.state.cometX - 50
            });
            ctx.clearRect(this.state.cometX+50,this.state.cometY, 50, 50);
        },500);

    }

    componentDidUpdate(){
        const ctx = this.refs.canvas.getContext('2d');
        const comet = this.refs.comet;

        ctx.drawImage(comet, this.state.cometX, this.state.cometY )
    }

    componentWillUnmount(){
        clearInterval(this.cometsIntervalId);
    }

    render() {
        if (this.state.view === "board") {
            return (
                <div className="board-canvas">
                    <canvas ref="canvas" width={1200} height={750} />
                    <img ref="ship" src={ship} className="hidden" />
                    <img ref="comet" src ={comet} className="hidden"/>
                </div>
            )
        } else if (this.state.view === "gameover"){
            return (
                <GameOver playerName={this.props.playerName}/>
            )
        }
    }
}