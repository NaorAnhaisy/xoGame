import React, { Component } from 'react';
import './Info.css';
import { Button } from 'react-bootstrap';

class Info extends Component {

    render() {
        return (
            <div className="info">
                {this.props.winner !== null ?
                    <>
                        {this.props.winner === undefined ?
                            <h1> It's a tie ...</h1>
                            :
                            <h1> {this.props.winner} is the Winner!</h1>}
                        <div className="row">
                            <Button className="col-lg-4 col-md-4 col-sm-4" variant="info" type="submit" onClick={this.props.playAgain}>Again?</Button>
                            <div className="col-lg-4 col-md-4 col-sm-4"></div>
                            <Button className="col-lg-4 col-md-4 col-sm-4" variant="warning" type="submit" onClick={this.props.backToMenu}>Back to menu...</Button>
                        </div>
                    </> :
                    <span className="turn-info">It's <b>{this.props.playersNames[this.props.isFirstPlayerTurn ? 0 : 1]}</b> Turn!</span>
                }

            </div>
        );
    }
}

export default Info;