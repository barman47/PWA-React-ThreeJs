import React, {Component} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGlobe, faInfo, faSpaceShuttle, faSearch, faTimes, faLock} from "@fortawesome/free-solid-svg-icons"
import {switchValue} from "./../threejs/planetarium/sceneActions/Raycaster"
import {buildOrbitControls} from "./../threejs/planetarium/SceneManager"
import "../style/Modal.css";
import PopupLock from "./PopupLock"
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
            initialItems: ["Moon", "Saturn", "Uranus", "Jupiter", "Mars", "Mercury", "Venus", "Neptune"],
            items: []
        }
    }

    filterList = (event) => {
        var updatedList = this.state.initialItems;

        updatedList = updatedList.filter((item) => {
            let itemCase = item.toString().toLowerCase()
            return itemCase.search(event.target.value.toLowerCase()) !== -1
        });
        this.setState({items: updatedList});
    }

    componentWillMount() {
        this.setState({
            items: this.state.initialItems,
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

                    <div id="listPlanete">

                        <h3> Planètes </h3>


                        <List items={this.state.items}
                              onClose={this.props.onClose}
                              currentObj={this.props.currentObj}
                              optsThree={this.props.optsThree}
                              updateOptsThree={this.props.updateOptsThree}
                        />


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
            item: null
        }

    }


    btnNavette(item) {

        if (localStorage.getItem('discover')) {
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


    render() {

        return (


            <TransitionGroup className="todo-list">

                <PopupLock show={this.state.show}
                           onClose={this.togglePopup}
                           planet={this.state.item}/>

                {this.props.items.map((item, index) => (

                    <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="fade"
                    >
                        <li key={index}>


                            <div>
                                <FontAwesomeIcon icon={faGlobe} size="lg"/>
                                {item}
                            </div>
                            <div className="right">


                                <div className="containerIcon">
                                    <FontAwesomeIcon icon={faInfo} size="lg"
                                                     onClick={() => console.log("info planet : " + item)}/>
                                    {localStorage.getItem('discover') &&

                                    <FontAwesomeIcon icon={faLock}
                                                     className="lock"
                                                     size="xs"/>
                                    }


                                </div>


                                <div className="containerIcon">
                                    <FontAwesomeIcon icon={faSpaceShuttle} transform={{rotate: 300}} size="lg"
                                                     onClick={() => this.btnNavette(item)}>

                                    </FontAwesomeIcon>
                                    {localStorage.getItem('discover') &&

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
