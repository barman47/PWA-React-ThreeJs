import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faImages} from '@fortawesome/free-solid-svg-icons'
import {CSSTransition} from "react-transition-group";
import "../style/Popup.css"

export default class ButtonsPhoto extends Component {


    render() {
        return (

            <CSSTransition
                in={(this.props.show === "parachute-box")}
                timeout={300}
                classNames="popup"
                unmountOnExit
            >
                <div id="btn-photo">
                    <a href="OpenStars://">
                        <button className="button">
                            <h3> Nouvelle Photo </h3>
                            <FontAwesomeIcon icon={faCamera} fixedWidth size="3x"/>
                        </button>

                    </a>

                    <a href="OpenStars://">
                        <button className="button">
                            <h3>Galerie Photo</h3>
                            <FontAwesomeIcon icon={faImages} fixedWidth size="3x"/>
                        </button>

                    </a>

                </div>
            </CSSTransition>


        );
    }
}








