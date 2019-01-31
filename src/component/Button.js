import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../style/Popup.css"

export default class Button extends Component {


    render() {
        return (
            <button className="buttonPopup"
                    onClick={this.props.onClick}>
                <p> {this.props.textButton} </p>
                <div className="cube">
                    <FontAwesomeIcon className="arrow" icon={this.props.iconButton} size="2x"/>
                </div>
            </button>

        );
    }
}








