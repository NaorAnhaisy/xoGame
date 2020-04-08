import React, { Component } from 'react';
import './Board.css'
import Square from '../Square/Square'
import { getBest } from '../../ComputerAI.js'
import BoardSizeSelect from '../BoardSizeSelect/BoardSizeSelect'

// You must have odd board size
const START_BOARD_SIZE = 3;

class Board extends Component {

    componentDidMount() {
        this.setBoardSize(START_BOARD_SIZE)
    }

    state = {
        boardSize: 0,
        squareArray: null
    }

    setBoardSize = (newBoardSize) => {
        if (newBoardSize % 2 === 0) {
            throw new Error("Board Size is even. (Board_Size % 2 = 0)");
        }

        this.setState({
            boardSize: newBoardSize,
            squareArray: new Array(newBoardSize).fill(null).map(() => new Array(newBoardSize).fill(null))
        })
    }

    initBoard = () => {
        this.setState({
            squareArray: new Array(this.state.boardSize).fill(null).map(() => new Array(this.state.boardSize).fill(null))
        });
    }

    componentDidUpdate() {
        if (this.props.playMode === 1) {
            this.makeComputerMove();
        }
    }

    handleSquareClick = (row, col) => {
        if (!this.checkIsAbleToClicked(row, col)) {
            return;
        }

        if (this.props.playMode === 1) {

            if (this.props.isFirstPlayerTurn) {
                this.handleMove(row, col)
            }
            this.makeComputerMove();

        } else if (this.props.playMode === 2) {
            this.handleMove(row, col)
        }
    }

    makeComputerMove() {
        setTimeout(function () {
            if (!this.props.isFirstPlayerTurn) {
                if (this.checkIsComputerAbleToPlay()) {
                    this.handleComputerMove();
                }
            }
        }.bind(this), 1500);
    }

    checkIsComputerAbleToPlay() {
        return ((this.props.gameStarted) &&
            (this.props.winner === null));
    }

    checkIsAbleToClicked(row, col) {
        return (this.checkIsComputerAbleToPlay() &&
            (this.state.squareArray[row][col] === null));
    }

    handleMove = (row, col) => {

        let newSquareArray = [...this.state.squareArray];
        newSquareArray[row][col] = this.props.isFirstPlayerTurn ? 'X' : 'O';
        this.setState({ squareArray: newSquareArray });

        if (this.checkWinner()) {
            this.props.gameEnded('win');
        } else if (this.checkTie()) {
            this.props.gameEnded('tie');
        }

        this.props.switchPlayer();
    }

    handleComputerMove = () => {
        let point = getBest(this.state.squareArray, this.state.boardSize, this.props.difficultyLevel);
        if (point !== null) {
            this.handleMove(point.row, point.col)
        }
    }

    checkTie = () => {
        for (let arr of this.state.squareArray) {
            if (arr.indexOf(null) !== -1) {
                return false;
            }
        }

        return true;
    }

    checkWinner = () => {
        let board = this.state.squareArray;

        // Check rows
        for (let row = 0; row < this.state.boardSize; row++) {
            let firstValue = board[row][0];
            for (let col = 1; col < this.state.boardSize; col++) {
                if ((firstValue == null) ||
                    (board[row][col] !== firstValue)) {
                    break;
                }

                if (col === this.state.boardSize - 1) {
                    return true;
                }
            }
        }

        // Check colums
        for (let col = 0; col < this.state.boardSize; col++) {
            let firstValue = board[0][col];
            for (let row = 1; row < this.state.boardSize; row++) {
                if ((firstValue == null) ||
                    (board[row][col] !== firstValue)) {
                    break;
                }

                if (row === this.state.boardSize - 1) {
                    return true;
                }
            }
        }

        // Check first slant
        let firstValue = board[0][0];
        for (let index = 0; index < this.state.boardSize; index++) {
            if ((firstValue == null) ||
                (board[index][index] !== firstValue)) {
                break;
            }

            if (index === this.state.boardSize - 1) {
                return true;
            }
        }

        // Check second slant
        firstValue = board[0][this.state.boardSize - 1];
        for (let index = this.state.boardSize - 1; index >= 0; index--) {
            if ((firstValue == null) ||
                (board[this.state.boardSize - 1 - index][index] !== firstValue)) {
                break;
            }

            if (index === 0) {
                return true;
            }
        }

        return false;
    }

    createTable = () => {
        let table = [];
        for (let i = 0; i < this.state.boardSize; i++) {
            let children = [];
            for (let j = 0; j < this.state.boardSize; j++) {
                let currentPlace = j + (i * this.state.boardSize);
                children.push(<Square key={currentPlace} place={currentPlace} value={this.state.squareArray[i][j]} handleSquareClick={this.handleSquareClick} />);
            }

            table.push(<tr key={i}>{children}</tr>);
        }

        return table;
    }

    handleChange = () => {

    }

    render() {
        return (
            <div className={"board wrapper " + (this.props.gameStarted ? "full-width" : "eighty-width")}>
                <table className="squaresTable">
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>
                {!this.props.gameStarted &&

                    <div style={{ padding: "30px" }}>
                        <h3>Choose board Size:</h3>
                        <br />
                        <BoardSizeSelect setBoardSize={this.setBoardSize} />
                    </div>
                }
            </div>
        );
    }
}

export default Board;