import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faImages, faLockOpen} from '@fortawesome/free-solid-svg-icons'
import {CSSTransition} from "react-transition-group";
import "../style/Popup.css"
import Button from "./Button"

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
                        <Button textButton="Nouvelle Photo"
                                iconButton={faCamera}/>

                    </a>

                    <a href="OpenStars://">

                        <Button textButton="Galerie Photo"
                                iconButton={faImages}/>
                    </a>
                </div>
            </CSSTransition>


        );
    }
}








