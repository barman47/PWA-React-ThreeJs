import React, { Component } from 'react';
import threeEntryPoint from './../threejs/threeEntryPoint';

export default class ThreeContainer extends Component {

    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }

    render () {
        return (
            <div className="App-header" ref={element => this.threeRootElement = element} />
    );
    }
}