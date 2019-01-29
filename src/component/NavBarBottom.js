import React, {Component} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCogs, faSearch, faEye, faCompass, faCalendarCheck, faParachuteBox} from "@fortawesome/free-solid-svg-icons"
import ButtonsPhoto from "./ButtonsPhoto"
import ModalRecherche from "./ModalRecherche"
import ModalParam from "./ModalParam"

import {switchValue} from "./../threejs/planetarium/sceneActions/Raycaster"
import {buildOrientationControl} from "./../threejs/planetarium/SceneManager"

//import {Context} from "../store/Context";


export default class NavBarBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recherche: false,
            param: false,
            btnLocalisation: faCompass,
            currentObj: null,
            optsThreeGlobal: this.props.optsThreeGlobal,

        };
    }

    // mise a jour du state quand le props change
    static getDerivedStateFromProps(props, state) {
        if (props.optsThreeGlobal !== state.optsThreeGlobal && null !== state.optsThreeGlobal) {
            return {optsThreeGlobal: props.optsThreeGlobal};
        }
        return null;
    }


    // ouvre le modal lors du clique sur le bouton recherche
    toggleModalRecherche = () => {
        this.setState({
            recherche: !this.state.recherche,
        });
    }

    // ouvre le modalParam lors du clique sur le bouton param
    toggleModalParam = () => {
        this.setState({
            param: !this.state.param,
        });
    }

    // click sur le bouton parachute
    clickBtnLoca = () => {
        this.setState({
            btnLocalisation: faCompass,
        });

        // on revient sur la terre
        switchValue("Back", this.state.optsThreeGlobal, this.state.currentObj, this.props.updateOptsThree);

        if (this.state.optsThreeGlobal.controlsType === "orbit") {
            setTimeout(
                () => {
                    buildOrientationControl(this.state.optsThreeGlobal, this.props.updateOptsThree);
                }, 3000);

        }
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
    }


    componentDidMount() {
        window.addEventListener('btnToParachute', this.btnToParachute)
        window.addEventListener('changeCurrentObj', this.changeCurrentObj)
    }

    componentWillUnmount() {
        window.removeEventListener('btnToParachute', this.btnToParachute);
        window.removeEventListener('changeCurrentObj', this.changeCurrentObj)
    }

    render() {


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


                <ButtonsPhoto show={this.state.btnLocalisation.iconName}/>

                <div id="btn-navigation">

                    <button id="btnRecherche" onClick={this.toggleModalRecherche}>
                        <FontAwesomeIcon icon={faSearch} size="2x"/>
                    </button>
                    <button onClick={this.toggleModalParam}>
                        <FontAwesomeIcon icon={faCogs} size="2x"/>
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faEye} size="2x"/>
                    </button>
                    <button id="btnAgenda">
                        <FontAwesomeIcon icon={faCalendarCheck} size="2x"/>
                    </button>
                    <button id="btnLocalisation" onClick={() => this.clickBtnLoca(this.state.optsThreeGlobal)}>
                        <FontAwesomeIcon icon={this.state.btnLocalisation} size="2x"/>
                    </button>
                </div>

                <ModalRecherche show={this.state.recherche}
                                onClose={this.toggleModalRecherche}
                                currentObj={this.state.currentObj}
                                optsThree={this.state.optsThreeGlobal}
                                updateOptsThree={this.props.updateOptsThree}>
                </ModalRecherche>

                <ModalParam show={this.state.param}
                            onClose={this.toggleModalParam}
                            optsThree={this.state.optsThreeGlobal}
                            updateOptsThree={this.props.updateOptsThree}>
                </ModalParam>


            </div>

        );
    }
}

