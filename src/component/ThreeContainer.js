import React, {Component} from 'react';
import threeEntryPoint from './../threejs/threeEntryPoint';
import mouseDown from './../threejs/mouseDown';

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


    // detecte le changement de la valeur des props
    static getDerivedStateFromProps(props, state) {
        // si le props : optsSave est different du props : optsThreeGlobal
        if (props.optsThreeGlobal !== state.optsSave && null !== state.optsSave) {
            mouseDown(props.updateOptsThree, props.optsThreeGlobal);
        }
        return null;
    }

    render() {
        return (
            <div className="App-header" ref={element => this.threeRootElement = element}/>
        );
    }
}