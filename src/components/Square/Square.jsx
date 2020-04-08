import React, { Component } from 'react';
import './Square.css'

class Square extends Component {

    handleClick = (event) => {
        let row = event.target.parentElement.rowIndex;
        let col = event.target.cellIndex;
        this.props.handleSquareClick(row, col);
    }

    render() {
        return (
            <td className={this.props.value} onClick={this.handleClick}></td>
        )
    }
}

export default Square;