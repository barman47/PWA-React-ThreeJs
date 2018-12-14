import React, { Component } from 'react';
import threeEntryPoint from './../threejs/threeEntryPoint';
import NavBarBottom from "./NavBarBottom";

export default class ThreeContainer extends Component {

    componentDidMount() {
        threeEntryPoint(this.threeRootElement, this.props.updateOptsThree);
    }

    render () {
        return (
            <div className="App-header" ref={element => this.threeRootElement = element} />
    );
    }
}