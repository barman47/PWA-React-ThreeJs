import React, {Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCogs, faSearch,faEye , faCompass, faCalendarCheck, faParachuteBox} from '@fortawesome/free-solid-svg-icons'
import ButtonsPhoto from './ButtonsPhoto'
import Modal from './Modal'

import { Context } from "../store/Context";



export default class NavBarBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            btnLocalisation: faCompass

        };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,

        });
    }
    localisationClick=()=> {
        this.setState({
            btnLocalisation:faParachuteBox,
        })
    }


    componentDidMount() {
        window.addEventListener('localisationClick', this.localisationClick)
    }

    componentWillUnmount() {
        window.removeEventListener('localisationClick', this.localisationClick);
    }

    render() {
        return (
            <div id="btn">
                <Context.Consumer>
                    {({accueil, toggleAccueil}) => (
                        <button
                            onClick={toggleAccueil}
                        >
                            {console.log({accueil})}
                        </button>
                    )}
                </Context.Consumer>

                {/*<ButtonsPhoto/>*/}

                <div id="btn-navigation">

                    <button id="btnRecherche" onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={faSearch}  size="2x"   />
                    </button>
                    <button >
                        <FontAwesomeIcon icon={faCogs} size="2x" />
                    </button>
                    <button >
                        <FontAwesomeIcon icon={faEye} size="2x" />
                    </button>
                    <button id="btnAgenda">
                        <FontAwesomeIcon icon={faCalendarCheck}  size="2x" />
                    </button>
                    <button id="btnLocalisation">
                        <FontAwesomeIcon icon={this.state.btnLocalisation} size="2x" />
                    </button>

                </div>

                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal}>
                </Modal>


            </div>

        );
    }
}