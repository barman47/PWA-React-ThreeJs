import React, {Component} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faGlobe,
    faInfo,
    faSpaceShuttle,
    faSearch,
    faTimes,
    faLock,
    faDotCircle,
    faStar,
    faLockOpen
} from "@fortawesome/free-solid-svg-icons"

import {switchValue} from "./../threejs/planetarium/sceneActions/Raycaster"
import {buildOrbitControls} from "./../threejs/planetarium/SceneManager"
import "../style/Modal.css";
import Popup from "./Popup"
import "../style/Popup.css"

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import PopupCompass from "./ModalParam";

export default class ModalRecherche extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialItemsPlanets: ["Saturne", "Uranus", "Jupiter", "Mars", "Mercure", "Vénus", "Neptune"],
            itemsPlanets: [],

            initialItemsSatellite: ["Moon", "Calisto", "Titan"],
            itemsSatellite: []
        }
    }

    filterList = (event) => {
        var updatedListPlanet = this.state.initialItemsPlanets;

        updatedListPlanet = updatedListPlanet.filter((item) => {
            let itemCase = item.toString().toLowerCase()
            return itemCase.search(event.target.value.toLowerCase()) !== -1
        });

        var updatedListSatellite = this.state.initialItemsSatellite;

        updatedListSatellite = updatedListSatellite.filter((item) => {
            let itemCase = item.toString().toLowerCase()
            return itemCase.search(event.target.value.toLowerCase()) !== -1
        });


        this.setState({
            itemsPlanets: updatedListPlanet,
            itemsSatellite: updatedListSatellite
        });

    }


    componentWillMount() {
        this.setState({
            itemsPlanets: this.state.initialItemsPlanets,
            itemsSatellite: this.state.initialItemsSatellite,
        })

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
                            <FontAwesomeIcon icon={faSearch} size="lg"/>
                            <input id="search"
                                   type="search"
                                   placeholder="Recherche"
                                   onChange={this.filterList}/>
                        </h3>
                    </div>

                    <div className="scroller">

                        <div id="listPlanete">

                            <h3> Planètes </h3>

                            <List items={this.state.itemsPlanets}
                                  onClose={this.props.onClose}
                                  currentObj={this.props.currentObj}
                                  optsThree={this.props.optsThree}
                                  updateOptsThree={this.props.updateOptsThree}
                                  icon={faGlobe}
                            />


                        </div>


                        <div id="listPlanete">

                            <h3> Satellites </h3>


                            <List items={this.state.itemsSatellite}
                                  onClose={this.props.onClose}
                                  currentObj={this.props.currentObj}
                                  optsThree={this.props.optsThree}
                                  updateOptsThree={this.props.updateOptsThree}
                                  icon={faDotCircle}
                            />


                        </div>

                        <div id="listPlanete">

                            <h3> Etoiles </h3>


                            <List items={this.state.itemsSatellite}
                                  onClose={this.props.onClose}
                                  currentObj={this.props.currentObj}
                                  optsThree={this.props.optsThree}
                                  updateOptsThree={this.props.updateOptsThree}
                                  icon={faStar}
                            />


                        </div>
                    </div>

                </div>

            </CSSTransition>

        );
    }
}


class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            item: null,
            itemsDiscover: ["Saturne", "Uranus", "Moon"]
        }

    }


    btnNavette(item) {

        if (localStorage.getItem('discover') && !this.checkUnlock(item)) {
            this.setState({
                    item: item,
                    show: true,
                }
            )
        } else {
            if (this.props.optsThree.controlsType === "orientation") {
                buildOrbitControls(this.props.optsThree, this.props.updateOptsThree)
                console.log(" <<<<<>>>>>>> c'est fait : " + this.props.optsThree.controlsType)

            }
            switchValue(item, this.props.optsThree, this.props.currentObj, this.props.updateOptsThree);
            this.props.onClose();
        }

    }

    togglePopup = () => {
        this.setState({
            show: !this.state.show,
        });
    }

    checkUnlock = (item) => {
        return this.state.itemsDiscover.some(function (arrVal) {
            return item === arrVal;
        });
    }

    onClick = () => {
        localStorage.removeItem('discover')
        this.props.history.push('/')
    }


    render() {

        const textHaut = " Vous souhaitez faire un tour sur " + this.state.item + " ?"
        const textBas = "Pour cela, munissez-vous de vos identifiant afin de monter à bord de votre navette spatiale !"
        const textButton = "Se connecter"
        const iconButton = faLockOpen


        return (

            <TransitionGroup className="todo-list">

                <Popup show={this.state.show}
                       onClose={this.togglePopup}
                       planet={this.state.item}
                       onClick={this.onClick}
                       textHaut={textHaut}
                       textBas={textBas}
                       textButton={textButton}
                       iconButton={iconButton}/>

                {this.props.items.map((item, index) => (

                    <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="fade"
                    >
                        <li key={index}>


                            <div className="left">
                                <FontAwesomeIcon icon={this.props.icon} size="lg"/>
                                {item}
                            </div>
                            <div className="right">


                                <div className="containerIcon">
                                    <FontAwesomeIcon icon={faInfo} size="lg"
                                                     onClick={() => console.log("info planet : " + item)}/>
                                    {localStorage.getItem('discover') && !this.checkUnlock(item) &&

                                    <FontAwesomeIcon icon={faLock}
                                                     className="lock"
                                                     size="xs"/>
                                    }


                                </div>


                                <div className="containerIcon">
                                    <FontAwesomeIcon icon={faSpaceShuttle} transform={{rotate: 300}} size="lg"
                                                     onClick={() => this.btnNavette(item)}>

                                    </FontAwesomeIcon>
                                    {localStorage.getItem('discover') && !this.checkUnlock(item) &&

                                    <FontAwesomeIcon icon={faLock}
                                                     className="lock"
                                                     size="xs"/>
                                    }

                                </div>

                            </div>
                        </li>
                    </CSSTransition>


                ))
                }

            </TransitionGroup>
        )

    }
}
