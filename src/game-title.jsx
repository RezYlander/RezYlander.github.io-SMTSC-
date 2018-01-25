import React from 'react';

export class GameTitle extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="text-effect">
                <h1 className="neon" data-text="SUPER-MEGA TURBO-CRAP">SUPER-MEGA TURBO-CRAP</h1>
                <div className="gradient"/>
                <div className="spotlight"/>
            </div>
        )
    }
}