import React, {Component} from 'react';
import {styleGlobal} from "../style/StyleGlobal"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faTimes, faLockOpen, faLock} from '@fortawesome/free-solid-svg-icons'
import "../style/Popup.css"
import {CSSTransition} from 'react-transition-group';
import {calibrerCompass} from './../threejs/planetarium/SceneManager'

export default class PopupLock extends Component {

    onClick = () => {
        localStorage.removeItem('discover')
        this.props.history.push('/')
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
                                        Vous souhaitez faire un tour sur {this.props.planet} ?
                                    </h2>

                                </div>
                                <div>
                                    <p> Pour cela, munissez-vous de vos identifiant afin de monter à bord de votre
                                        navette spatiale ! </p>

                                    <button className="buttonPopup"
                                            onClick={this.onClick}>
                                        <p> Se connecter </p>
                                        <div className="cube">
                                            <FontAwesomeIcon className="arrow" icon={faLockOpen} size="2x"/>
                                        </div>
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