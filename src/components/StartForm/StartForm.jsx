import React, { Component } from 'react';
import './StartForm.css';
import { Form, Row, Col, Button } from 'react-bootstrap';

const START_SCORE = 0;

class StartForm extends Component {

    state = {
        error: null,
        showText: false
    }

    componentDidMount() {
        // Timeout must be like in '.form-enter' animation seconds (in the css file)
        setTimeout(() => {
            this.setState({ showText: true })
        }, this.props.isNeedTimout ? 1500 : 0)
    }

    backToSelectMode = () => {
        this.props.setPlayModeFunc(0)
    }

    handleClick = async (event) => {
        event.preventDefault();

        await this.setState({
            error: null
        })

        let firstPlayer = this.refs.firstPlayer.value;
        let secondPlayer;

        if (this.props.isOnePlayer) {
            switch (this.props.difficultyLevel) {
                case "1":
                    secondPlayer = "John the lemon :)"
                    break;
                case "2":
                    secondPlayer = "Think Your'e Good?"
                    break;
                case "3":
                    secondPlayer = "Best PC EVER !"
                    break;

                default:
                    secondPlayer = "Not sure..."
                    break;
            }
        } else {
            secondPlayer = this.refs.secondPlayer.value;
            if (secondPlayer.trim() === '') {
                await this.setState({
                    error: 'PUT A NAME YOU SON OF A BITCH!'
                })
            }
        }

        if (firstPlayer.trim() === '') {
            await this.setState({
                error: 'PUT A NAME YOU SON OF A BITCH!'
            })
        }

        if (this.state.error != null) {
            return;
        }

        var players = [
            {
                name: firstPlayer,
                score: START_SCORE
            },
            {
                name: secondPlayer,
                score: START_SCORE
            }
        ];

        this.props.handleStart(players);
    }

    render() {
        return (
            <>
                {this.state.showText && <Form className={'form-enter'}>
                    <Row>
                        <Col>
                            <Form.Control placeholder={this.props.isOnePlayer === false ? "First player" : "Your name"} ref="firstPlayer" />
                        </Col>
                        {this.props.isOnePlayer === false ?
                            <Col>
                                <Form.Control placeholder="Second player" ref="secondPlayer" />
                            </Col> : null}
                    </Row>
                    <Row>
                        <Button variant="info" type="submit" className="play-button" onClick={this.handleClick}>Play!</Button>
                    </Row>
                    {this.state.error === null ? '' : <div className='err'>{this.state.error}</div>}
                    <Row>
                        <Button variant="dark" type="submit" className="back-to-select-mode" onClick={this.backToSelectMode}>Select different mode</Button>
                    </Row>
                </Form>}
            </>
        );
    }
}

export default StartForm;