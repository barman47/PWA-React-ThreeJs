import React, {Component} from "react";
import ModalCompass from "./ModalCompass"
import "../style/popupModal.css"
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faUserAstronaut,
    faVrCardboard,
    faCompass,
    faSignOutAlt,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons"


export default class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            compass: false,
            in: false
        }

    }

    // ouvre le modalParam lors du clique sur le bouton param
    toggleModalCompass = () => {
        this.setState({
            compass: !this.state.compass,
        });
    }


    render() {
        const modalo = () => (
                <p> cocuco </p>
            )

        ;

        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <FontAwesomeIcon className="close" icon={faTimes} size="lg" onClick={this.props.onClose}/>

                        <h3>
                            Paramètre
                        </h3>
                    </div>

                    <div id="listPlanete">

                        <h3></h3>

                        <ul>


                            <li onClick={this.toggleModalCompass}>
                                <FontAwesomeIcon icon={faCompass} size="lg" fixedWidth/>
                                <a>Calibrer la boussole</a>
                                {this.props.optsThree.typeDevice != "mobile" &&
                                <div>Disponible seulement sur mobile et tablette </div>}
                            </li>

                            <li>
                                <FontAwesomeIcon icon={faVrCardboard} size="lg" fixedWidth/>
                                <a>Réalité augmenté</a>
                                {this.props.optsThree.typeDevice != "mobile" &&
                                <div>Disponible seulement sur mobile et tablette </div>}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faUserAstronaut} size="lg" fixedWidth/>
                                <a>Compte</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faInfoCircle} size="lg" fixedWidth/>
                                <a>A propos</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg" fixedWidth/>
                                <a>Déconnexion</a>
                            </li>

                        </ul>

                    </div>

                    {/*{this.state.compass && <ModalCompass show={this.state.compass}*/}
                    {/*onClose={this.toggleModalCompass}*/}
                    {/*optsThree={this.props.optsThree}*/}
                    {/*updateOptsThree={this.props.updateOptsThree}>*/}
                    {/*</ModalCompass>}>*/}

                    <div>
                            <ModalCompass show={this.state.compass}
                                          onClose={this.toggleModalCompass}
                                          optsThree={this.props.optsThree}
                                          updateOptsThree={this.props.updateOptsThree}>
                            </ModalCompass>

                    </div>


                </div>
            </div>

        );
    }
}