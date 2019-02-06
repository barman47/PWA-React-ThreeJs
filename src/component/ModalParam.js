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
            showCompass: false,
            showCompte: false,
        }
    }

    // ouvre le modalParam lors du clique sur le bouton param
    togglePopup(state, value) {
        console.log("je me casse : ", [state])
        this.setState({
            [state]: !value,
        });
    }

    logOut = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('discover')
        this.props.history.push('/')
    }

    onClickCalibrer = (props) => {
        calibrerCompass(this.props.optsThree, this.props.updateOptsThree);
        this.props.onClose();
    }

    clickCompte = () => {

        if (localStorage.getItem('discover')) {
            this.setState({
                    showCompte: true,
                }
            )
        } else {
            this.props.history.push({
                pathname: '/compte'
            })
        }
    }


    render() {

        const textHaut = "Afin de calibrer correctement la boussole du planétarium"
        const textBas = "Veuillez poser votre mobile sur une surface plane"
        const textButton = "C'est fait"
        const iconButton = faAngleRight

        const textHautCompte = "Vous souhaitez integrer la comunauté d'astronaute ?  "
        const textBasCompte = "N'attendez plus une année-lumière  ! "
        const textButtonCompte = "Je me connecte"
        const iconButtonCompte = faAngleRight

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
                                <div onClick={() => this.togglePopup("showCompass", this.state.showCompass)}>
                                    <FontAwesomeIcon icon={faCompass} size="lg" fixedWidth/>
                                    Calibrer la boussole
                                </div>
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
                            </li>
                            <li>
                                <div className="containerIcon">
                                    <div onClick={this.clickCompte}>
                                        <FontAwesomeIcon icon={faUserAstronaut} size="lg" fixedWidth/>
                                        Compte
                                    </div>
                                    {localStorage.getItem('discover') && <FontAwesomeIcon icon={faLock}
                                                                                          className="lock"
                                                                                          size="xs"/>}
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

                        <Popup show={this.state.showCompass}
                               onClose={() => this.togglePopup("showCompass", this.state.showCompass)}
                               onClick={this.onClickCalibrer}
                               textHaut={textHaut}
                               textBas={textBas}
                               textButton={textButton}
                               iconButton={iconButton}/>

                        <Popup show={this.state.showCompte}
                               onClose={() => this.togglePopup("showCompte", this.state.showCompte)}
                               onClick={this.logOut}
                               textHaut={textHautCompte}
                               textBas={textBasCompte}
                               textButton={textButtonCompte}
                               iconButton={iconButtonCompte}/>

                    </div>
                </div>
            </CSSTransition>
        );
    }
}

export default withRouter(ModalParam)