import React, {Component} from "react";
import PopupCompass from "./PopupCompass"
import "../style/Popup.css"
import {CSSTransition} from 'react-transition-group';
import {Redirect, withRouter} from 'react-router';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faUserAstronaut,
    faVrCardboard,
    faCompass,
    faSignOutAlt,
    faTimes,
    faInfoCircle, faSpaceShuttle, faLock
} from "@fortawesome/free-solid-svg-icons"


class ModalParam extends Component {

    constructor(props) {
        super(props)
        this.state = {
            compass: false,
        }

    }

    // ouvre le modalParam lors du clique sur le bouton param
    toggleModalCompass = () => {
        this.setState({
            compass: !this.state.compass,
        });
    }

    logOut = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('discover')
        this.props.history.push('/')

    }


    render() {
        return (

            <CSSTransition
                in={this.props.show}
                timeout={200}
                classNames="popup"
                unmountOnExit
            >

                <div className="modal-content">
                    <div className="modal-header">
                        <FontAwesomeIcon className="close" icon={faTimes} size="lg" onClick={this.props.onClose}/>

                        <h3>
                            Paramètre
                        </h3>
                    </div>

                    <div id="listPlanete">


                        <li>
                            <div onClick={this.toggleModalCompass}>
                                <FontAwesomeIcon icon={faCompass} size="lg" fixedWidth/>
                                Calibrer la boussole
                            </div>
                            {this.props.optsThree.typeDevice !== "mobile" &&
                            <div className="right">Disponible seulement sur mobile et tablette </div>}
                        </li>

                        <li>
                            <div className="containerIcon">
                                <div>
                                    <FontAwesomeIcon icon={faVrCardboard} size="lg" fixedWidth/>
                                    Réalité augmenté
                                </div>
                                {localStorage.getItem('discover') && <FontAwesomeIcon icon={faLock}
                                                                                      className="lock"
                                                                                      size="xs"/>}
                            </div>
                            {this.props.optsThree.typeDevice !== "mobile" &&
                            <div className="right">Disponible seulement sur mobile et tablette </div>}
                        </li>
                        <li>
                            <div>
                                <FontAwesomeIcon icon={faUserAstronaut} size="lg" fixedWidth/>
                                Compte
                            </div>
                        </li>
                        <li>
                            <div>
                                <FontAwesomeIcon icon={faInfoCircle} size="lg" fixedWidth/>
                                A propos
                            </div>
                        </li>
                        <li>
                            <div onClick={this.logOut}>
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg" fixedWidth/>
                                Déconnexion
                            </div>
                        </li>


                    </div>

                    <PopupCompass show={this.state.compass}
                                  onClose={this.toggleModalCompass}
                                  optsThree={this.props.optsThree}
                                  updateOptsThree={this.props.updateOptsThree}>
                    </PopupCompass>

                </div>
            </CSSTransition>
        );
    }
}

export default withRouter(ModalParam)