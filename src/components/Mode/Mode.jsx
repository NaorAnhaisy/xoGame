import React, { Component } from 'react';
import './Mode.css';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

var imgKey = 0
class Mode extends Component {

    PlayerVsPc = (eventKey) => {
        this.props.setPlayModeFunc(1)
        this.props.setDifficultyLevelFunc(eventKey)
    }

    TwoPlayers = () => {
        this.props.setPlayModeFunc(2)
    }

    addStarImages = (numOfImages) => {
        let images = []

        for (let i = 0; i < numOfImages; i++) {
            images.push(<img key={imgKey++} className="star-icon" src="https://cdn.pixabay.com/photo/2016/12/18/11/02/star-1915449_960_720.png" alt="starIcon" />)
        }

        return images
    }

    render() {
        return (
            <div className={'info ' + this.props.clsName}>
                <h1>Select play mode:</h1>
                <hr />

                <div className="row mode-btn-div">
                    <div className="col-6">
                        <DropdownButton onSelect={this.PlayerVsPc} title="Me Vs PC ">
                            <Dropdown.Item eventKey="1">
                                <div className="row">
                                    <span style={{ color: "green" }} className="col-6">Easy</span>
                                    <div className="col-6">
                                        {this.addStarImages(1)}
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                <div className="row levels-div">
                                    <span style={{ color: "#e96420" }} className="col-6">Medium</span>
                                    <div className="col-6">
                                        {this.addStarImages(2)}
                                    </div>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                                <div className="row levels-div">
                                    <span style={{ color: "#c60416" }} className="col-6">Expert</span>
                                    <div className="col-6">
                                        {this.addStarImages(3)}
                                    </div>
                                </div>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="col-6">
                        <Button variant="primary" type="submit" onClick={this.TwoPlayers} >2 Players</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mode;