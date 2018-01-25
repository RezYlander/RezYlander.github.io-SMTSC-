import React from 'react';
import {GameOver} from "./gameover.jsx";


var ship = require('./img/ship-small.png');
var comet = require('./img/comet-small.png');
var life = require('./img/heart.png');
var boom = require('./img/boom2-small.png');
var star = require('./img/star-small.png');

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "board",
            shipY: 350,
            points: 0,
            life: 3,
        }

    }

    drawStars = (star, ctx, ship) => {
        const stars = [];
        const numberOfstars = 333333333;
        let counter = 0;
        let starDefaultX = 1150;


        star.onload = () => {

            //TWORZENIE GWIAZDEK
            this.starsDrawInterval = setInterval(()=>{
                const starsSpawnYLocations = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750];

                if(counter <= numberOfstars ) {
                    let starDefaultY = starsSpawnYLocations[Math.floor(Math.random() * starsSpawnYLocations.length)];//Math.floor(Math.floor(Math.random() * (700 - 50 + 1) + 50));
                    stars.push({
                        x: starDefaultX,
                        y: starDefaultY
                    });
                    ctx.drawImage(star, starDefaultX, starDefaultY);
                    counter++;
                }

            },3000);

            //PORUSZANIE GWIAZDEK

            this.starsMoveInterval = setInterval(()=>{
                if(stars.length > 0) {
                    for (let i = 0; i < counter; i++) {

                        stars[i].x -=  50;

                        //KOLIZJA Z GWIAZDKĄ

                        if(stars[i].x === 50 && stars[i].y === this.state.shipY) {
                            this.setState({
                                points: this.state.points + 100,
                            });
                            ctx.clearRect(stars[i].x + 50, stars[i].y, 50, 50);
                            ctx.drawImage(ship, stars[i].x, stars[i].y);

                        }else{
                            ctx.clearRect(stars[i].x + 50, stars[i].y, 50, 50); // NORMALNY LOT KOMET
                            ctx.drawImage(star, stars[i].x, stars[i].y);
                        }
                        if (stars[i].x === 0 && stars[i].y === this.state.shipY){ // ZAPOBIEGANIE ZNIKNIECIU STATKU PO KOLIZJI
                            ctx.drawImage(ship, stars[i].x +50, stars[i].y);
                            ctx.clearRect(stars[i].x, stars[i].y, 50, 50);
                        }
                    }
                }
            },250);
        };
    };


    drawComets = (comet, ctx, ship) => {
        const comets = [];
        const numberOfComets = 99999999999999;
        let counter = 0;
        let cometDefaultX = 1150;

        const life1 = this.refs.life1;
        const life2 = this.refs.life2;
        const life3 = this.refs.life3;

        const boom = this.refs.boom;

        comet.onload = () => {

            //TWORZENIE KOMET
            this.cometsDrawInterval = setInterval(()=>{
                const cometsSpawnYLocations = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750];

                if(counter <= numberOfComets ) {
                    let cometDefaultY = cometsSpawnYLocations[Math.floor(Math.random() * cometsSpawnYLocations.length)];//Math.floor(Math.floor(Math.random() * (700 - 50 + 1) + 50));
                    comets.push({
                        x: cometDefaultX,
                        y: cometDefaultY
                    });
                    ctx.drawImage(comet, cometDefaultX, cometDefaultY);
                    counter++;
                } else {
                    clearInterval(this.cometsDrawInterval);
                    this.setState ({
                        view: "gameover"
                    })
                }

            },500);

            //PORUSZANIE KOMET

            this.cometsMoveInterval = setInterval(()=>{
                if(comets.length > 0) {
                    for (let i = 0; i < counter; i++) {

                        comets[i].x -=  50;

                        //KOLIZJA

                        if(comets[i].x === 50 && comets[i].y === this.state.shipY) {
                            this.setState({
                                life: this.state.life - 1,
                            });
                            if (this.state.life === 2){
                                life3.classList.add("hidden")
                            } else if (this.state.life === 1){      // EFEKT KOLIZJI
                                life2.classList.add("hidden")
                            } else if(this.state.life === 0){
                                this.setState({
                                    view: "gameover",
                                });
                                life1.classList.add("hidden")
                            }
                            ctx.clearRect(comets[i].x + 50, comets[i].y, 50, 50);
                            ctx.drawImage(boom, comets[i].x, comets[i].y);

                        }else{
                            ctx.clearRect(comets[i].x + 50, comets[i].y, 50, 50); // NORMALNY LOT KOMET
                            ctx.drawImage(comet, comets[i].x, comets[i].y);
                        }
                        if (comets[i].x === 0 && comets[i].y === this.state.shipY){ // ZAPOBIEGANIE ZNIKNIECIU STATKU PO KOLIZJI
                            ctx.drawImage(ship, comets[i].x +50, comets[i].y);
                            ctx.clearRect(comets[i].x, comets[i].y, 50, 50);

                        }
                        if (comets[i].x === 0 && comets[i].y !== this.state.shipY && this.state.life > 0){ //NABIJANIE PUNKTÓW
                            this.setState({
                                points: this.state.points + 10,
                            })
                        }
                    }
                }
            },250);
        };
    };

    componentDidMount() {
        const ctx = this.refs.canvas.getContext('2d');
        const ship = this.refs.ship;
        const comet = this.refs.comet;
        const star = this.refs.star;




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
                    break;
            }
            ctx.drawImage(ship, 50, this.state.shipY);
        };

        this.drawComets(comet, ctx, ship);
        this.drawStars(star, ctx, ship);

    }

    render() {
        if (this.state.view === "board") {
            return (
                <div className="board">
                    <div className="board-stats-container">
                        <ul className="board-stats-list">
                            <li>
                                <img ref="life1" src={life}/>
                                <img ref="life2" src={life}/>
                                <img ref="life3" src={life}/>
                            </li>
                            <li>Kapitan: {this.props.playerName}</li>
                            <li>Punkty: {this.state.points}</li>
                        </ul>
                    </div>
                    <div className="board-canvas">
                        <canvas className="real-canvas" ref="canvas" width={1200} height={750} />
                        <img ref="ship" src={ship} className="hidden" />
                        <img ref="comet" src ={comet} className="hidden"/>
                        <img ref="boom" src ={boom} className="hidden"/>
                        <img ref="star" src ={star} className="hidden"/>

                    </div>
                </div>
            )
        } else if (this.state.view === "gameover"){
            return (
                <GameOver playerName={this.props.playerName} playerScore={this.state.points}/>
            )
        }
    }
}