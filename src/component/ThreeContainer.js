import React, {Component} from 'react';
import threeEntryPoint from './../threejs/threeEntryPoint';

export default class ThreeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optsSave: null,
        };
    }

    componentDidMount() {
        threeEntryPoint(this.threeRootElement, this.props.updateOptsThree, this.props.optsThreeGlobal);
        this.setState({optsSave: this.props.optsThreeGlobal});
    }


    static getDerivedStateFromProps(props, state) {
        if (props.optsThreeGlobal !== state.optsSave && null !== state.optsSave) {
            // threeEntryPoint(this.threeRootElement, this.props.updateOptsThree, this.props.optsThreeGlobal);
        console.log("je suis diffrent du coup relance ")
        }
        return null;
    }

    render() {
        return (
            <div className="App-header" ref={element => this.threeRootElement = element}/>
        );
    }
}