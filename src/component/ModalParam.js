import React, {Component} from "react";
import "../style/Popup.css"
import {CSSTransition} from 'react-transition-group';
import {withRouter} from 'react-router';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faUserAstronaut,
    faMobileAlt,
    faCompass,
    faSignOutAlt,
    faTimes,
    faInfoCircle, faLock, faAngleRight
} from "@fortawesome/free-solid-svg-icons"
import Popup from "./Popup";
import {calibrerCompass} from "../threejs/planetarium/SceneManager";


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

    onClick = (props) => {
        calibrerCompass(this.props.optsThree, this.props.updateOptsThree);
        this.props.onClose();
    }

    clickCompte = () => {

        this.props.history.push({
            pathname: '/compte'
        })

    }


    render() {

        const textHaut = "Afin de calibrer correctement la boussole du planétarium"
        const textBas = "Veuillez poser votre mobile sur une surface plane"
        const textButton = "C'est fait"
        const iconButton = faAngleRight


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

                    <div className="scroller">

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
                                        <FontAwesomeIcon icon={faMobileAlt} size="lg" fixedWidth/>
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
                                <div onClick={this.clickCompte}>
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

                        <Popup show={this.state.compass}
                               onClose={this.toggleModalCompass}
                               onClick={this.onClick}
                               textHaut={textHaut}
                               textBas={textBas}
                               textButton={textButton}
                               iconButton={iconButton}/>

                    </div>
                </div>
            </CSSTransition>
        );
    }
}

export default withRouter(ModalParam)