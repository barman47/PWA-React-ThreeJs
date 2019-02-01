import React, {Component} from 'react';
import {styleGlobal} from "../style/StyleGlobal"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faLockOpen, faCamera} from '@fortawesome/free-solid-svg-icons'
import "../style/Popup.css"
import {CSSTransition} from 'react-transition-group';
import Button from "./Button";

class Popup extends Component {


    render() {
        return (

            <CSSTransition
                in={this.props.show}
                timeout={300}
                classNames="shade"
                unmountOnExit
            >

                {state => (
                    <div className="shade"
                         onClick={this.props.onClose}>


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
                                        {this.props.textHaut}
                                    </h2>

                                </div>
                                <div>
                                    <p> {this.props.textBas} </p>

                                    <Button textButton={this.props.textButton}
                                            iconButton={this.props.iconButton}
                                            onClick={this.props.onClick}/>

                                </div>
                            </div>
                        </CSSTransition>

                    </div>

                )}


            </CSSTransition>


        )
    }
}

export default Popup