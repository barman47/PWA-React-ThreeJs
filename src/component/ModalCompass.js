import React, {Component} from 'react';
import {styleGlobal} from "../style/StyleGlobal"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import "../style/popupModal.css"
import {calibrerCompass} from './../threejs/planetarium/SceneManager'

import {switchValue} from './../threejs/planetarium/sceneActions/Raycaster'
import {buildOrbitControls} from './../threejs/planetarium/SceneManager'

export default class ModalCompass extends Component {

    constructor(props) {
        super(props);
    }

    onClick = (props) => {
        calibrerCompass(this.props.optsThree, this.props.updateOptsThree);
        this.props.onClose();
    }


    render() {
        return (
            <div className="popup">
                <div className="popup-content">
                    <div style={styleGlobal.couleurFondBleu}>
                        <FontAwesomeIcon className="close" icon={faTimes} size="lg" onClick={this.props.onClose}/>
                        <h2>
                            Afin de calibrer correctement la boussole du planétarium
                        </h2>
                    </div>
                    <div>
                        <p> veuillez poser votre mobile sur une
                            surface plane </p>

                        <button className="button"
                                onClick={this.onClick}>
                            <h3> C'est fait </h3>
                            <FontAwesomeIcon className="arrow" icon={faAngleRight} size="lg" fixedWidth/></button>
                    </div>
                </div>
            </div>
        )
    }
}