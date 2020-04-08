import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
    render() {
        return (
            <div className="box">
                {this.props.children}
            </div>
        );
    }
}

export default Box;