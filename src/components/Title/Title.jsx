import React, { Component } from 'react'
import './Title.css';

class Title extends Component {
    render() {
        return (
            <h1 className="title-h1">
                <span className="title-span">"TIC</span><span className="title-span">TAC</span><span className="title-span">TOE"</span>
            </h1>
        )
    }
}

export default Title;