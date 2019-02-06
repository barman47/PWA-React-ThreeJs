import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faImages, faLock, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "../style/Popup.css"
import Button from "./Button"
import Popup from "./Popup";

export default class ButtonsPhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    togglePopup = () => {
        this.setState({
            show: !this.state.show,
        });
    }


    href() {
        window.open('OpenStars://', '_blank');
    }


    render() {

        const textHaut = "Cette fonctionnalité n'est pas encore disponible"
        const textBas = "Découvrer l'application mobile Open Stars"
        const textButton = "Télécharger"
        const iconButton = faAngleRight

        return (

            <div>

                <Popup show={this.state.show}
                       onClose={this.togglePopup.bind(this)}
                       planet={this.state.item}
                       onClick={this.togglePopup.bind(this)}
                       textHaut={textHaut}
                       textBas={textBas}
                       textButton={textButton}
                       iconButton={iconButton}/>

                <CSSTransition
                    in={(this.props.show === "parachute-box")}
                    timeout={300}
                    classNames="popup"
                    unmountOnExit
                >

                    <div id="btn-photo">
                        <div className="containerIcon">
                            <Button textButton="Nouvelle Photo"
                                    iconButton={faCamera}
                                    onClick={this.togglePopup.bind(this)}
                            />

                            {localStorage.getItem('discover') &&

                            <FontAwesomeIcon icon={faLock}
                                             className="lock"
                                             size="lg"
                                             style={{color: "#D2C19F"}}/>

                            }

                        </div>


                        <div>

                            <Button textButton="Galerie Photo"
                                    iconButton={faImages}
                                    onClick={this.togglePopup.bind(this)}/>
                        </div>
                    </div>

                </CSSTransition>

            </div>
        );
    }
}





