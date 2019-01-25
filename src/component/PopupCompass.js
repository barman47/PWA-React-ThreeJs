import React, {Component} from 'react';
import {styleGlobal} from "../style/StyleGlobal"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import "../style/Popup.css"
import {CSSTransition} from 'react-transition-group';
import {calibrerCompass} from './../threejs/planetarium/SceneManager'

export default class PopupCompass extends Component {

    onClick = (props) => {
        calibrerCompass(this.props.optsThree, this.props.updateOptsThree);
        this.props.onClose();
    }


    render() {
        return (

            <CSSTransition
                in={this.props.show}
                timeout={300}
                classNames="shade"
                unmountOnExit
            >

                {state => (
                    <div className="shade">


                        <CSSTransition
                            in={state === 'entered'}
                            timeout={300}
                            classNames="popup"
                            unmountOnExit
                        >

                            <div className="popup">
                                <div style={styleGlobal.couleurFondBleu}>
                                    <FontAwesomeIcon className="close" icon={faTimes} size="lg"
                                                     onClick={this.props.onClose}/>
                                    <h2>
                                        Afin de calibrer correctement la boussole du planétarium
                                    </h2>
                                </div>
                                <div>
                                    <p> veuillez poser votre mobile sur une
                                        surface plane </p>

                                    <button className="buttonPopup"
                                            onClick={this.onClick}>
                                        <h3> C'est fait </h3>
                                        <FontAwesomeIcon className="arrow" icon={faAngleRight}/>
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>


                    </div>

                )}


            </CSSTransition>


        )
    }
}