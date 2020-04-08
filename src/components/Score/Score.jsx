import React, { Component } from 'react';
import './Score.css';

class Score extends Component {

    render() {
        return (
            <div className="scroe-board">
                <h1 className="score-name">{this.props.player.name}</h1>
                <h2>Score: <span className="score-points">{this.props.player.score}</span></h2>
            </div>
        );
    }
}

export default Score;