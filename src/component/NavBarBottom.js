import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCogs, faSearch,faEye , faCompass, faCalendarCheck} from '@fortawesome/free-solid-svg-icons'

import Modal from './Modal'



export default class NavBarBottom extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };



    componentDidMount() {
        // threeEntryPoint(this.threeRootElement);
    }

    render() {
        return (
            <div id="btn">
                <div id="btn-navigation">

                    <button id="btnRecherche" onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={faSearch}  size="lg"   />
                    </button>
                    <button >
                        <FontAwesomeIcon icon={faCogs} size="lg" />
                    </button>
                    <button >
                        <FontAwesomeIcon icon={faEye} size="lg" />
                    </button>
                    <button id="btnAgenda">
                        <FontAwesomeIcon icon={faCalendarCheck}  size="lg" />
                    </button>
                    <button id="btnLocalisation">
                        <FontAwesomeIcon icon={faCompass} size="lg" />
                    </button>

                </div>

                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal}>
                </Modal>


            </div>

        );
    }
}