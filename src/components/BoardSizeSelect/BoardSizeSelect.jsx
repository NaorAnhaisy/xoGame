import React, { Component } from "react";
import './BoardSizeSelect.css'
import { DropdownButton, Dropdown } from 'react-bootstrap';

var values = [3, 5, 7, 9]
var options = [];

class BoardSizeSelect extends Component {

  componentDidMount() {
    this.createOptions();
    this.setState({ curBoardSize: options[0] })
  }

  state = {
    curBoardSize: {
      text: "",
      value: 0
    }
  };

  createOptions() {
    options = []
    values.forEach(value => {
      if (value % 2 === 0) {
        throw new Error("Optional board Size is even - (" + value + "). (Optional_Board_Size % 2 = 0)");
      } else {
        options.push({
          text: value + " X " + value,
          value: value
        });
      }
    });
  }

  createDropdown = () => {
    this.createOptions();
    return options.map(function (option, i) {
      return (
        <Dropdown.Item key={i} eventKey={option.value}>
          <div>
            <span>{option.text}</span>
          </div>
        </Dropdown.Item>)
    });
  }

  changeBoardSize = (eventKey) => {
    let integerEventKey = parseInt(eventKey, 10);
    this.setState({
      curBoardSize: options.filter(option =>
        option.value === integerEventKey)[0]
    });

    this.props.setBoardSize(integerEventKey);
  }

  render() {
    return (
      <DropdownButton className="select-board-size-dropdown" variant="danger" onSelect={this.changeBoardSize} title={this.state.curBoardSize.text}>
        {this.createDropdown()}
      </DropdownButton>
    )
  }
}

export default BoardSizeSelect;