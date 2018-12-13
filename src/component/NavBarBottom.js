import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCogs, faSearch, faEye, faCompass, faCalendarCheck, faParachuteBox} from '@fortawesome/free-solid-svg-icons'
import ButtonsPhoto from './ButtonsPhoto'
import Modal from './Modal'

import {switchValue} from './../threejs/planetarium/sceneActions/Raycaster'

import {Context} from "../store/Context";


export default class NavBarBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,

            btnLocalisation: faCompass,

            currentObj: null,
            //accueil: true,
            //earthExist: false,
            optsThree: {}

        };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,

        });
    }

    clickBtnLoca = () => {
        this.setState({
            btnLocalisation: faCompass,
        });
        switchValue("Back", this.state.optsThree, this.state.currentObj)
    }


    btnToParachute = () => {
        this.setState({
            btnLocalisation: faParachuteBox,
        })
    }


    changeCurrentObj = (e) => {
        this.setState({
            currentObj: e.detail,
        })
        // console.log("e.currentPlanet : " + e.detail )
    }

    sendOptsThree = (e) => {
        this.setState({
            optsThree: e.detail,
        })
        console.log("optsThree: ", this.state.optsThree.camera.position.x)
    }


    componentDidMount() {
        window.addEventListener('btnToParachute', this.btnToParachute)
        window.addEventListener('changeCurrentObj', this.changeCurrentObj)
        window.addEventListener('sendOptsThree', this.sendOptsThree)
    }

    componentWillUnmount() {
        window.removeEventListener('btnToParachute', this.btnToParachute);
        window.removeEventListener('changeCurrentObj', this.changeCurrentObj)
    }

    render() {

        let ButtonsPh;
        if (this.state.btnLocalisation.iconName === "parachute-box") {
            ButtonsPh = (<ButtonsPhoto/>)
        } else {
            ButtonsPh = null
        }


        return (
            <div id="btn">
                {/*<Context.Consumer>*/}
                {/*{({accueil, toggleAccueil}) => (*/}
                {/*<button*/}
                {/*onClick={toggleAccueil}*/}
                {/*>*/}
                {/*{console.log({accueil})}*/}
                {/*</button>*/}
                {/*)}*/}
                {/*</Context.Consumer>*/}

                {ButtonsPh}

                <div id="btn-navigation">

                    <button id="btnRecherche" onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={faSearch} size="2x"/>
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faCogs} size="2x"/>
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faEye} size="2x"/>
                    </button>
                    <button id="btnAgenda">
                        <FontAwesomeIcon icon={faCalendarCheck} size="2x"/>
                    </button>
                    <button id="btnLocalisation" onClick={() => this.clickBtnLoca()}>
                        <FontAwesomeIcon icon={this.state.btnLocalisation} size="2x"/>
                    </button>
                </div>

                {this.state.isOpen && <Modal show={this.state.isOpen}
                                             onClose={this.toggleModal}
                                             currentObj={this.state.currentObj}
                                             optsThree={this.state.optsThree}>
                </Modal>}>

                {/*<Modal show={this.state.isOpen}*/}
                       {/*onClose={this.toggleModal}*/}
                       {/*currentObj={this.state.currentObj}*/}
                       {/*optsThree={this.state.optsThree}>*/}
                {/*</Modal>*/}
            </div>

        );
    }
}