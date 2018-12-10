import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobe, faInfo, faSpaceShuttle, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'

export default class Modal extends React.Component {

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
        this.setState({items: this.state.initialItems})
    }


    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div id="myModal" className="modal">
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

                        <List items={this.state.items}/>

                    </div>

                </div>
            </div>

        );
    }
}


class List extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <ul>
                {
                    this.props.items.map(function (item) {
                        return (
                            <li>
                                <FontAwesomeIcon icon={faGlobe} size="lg"/>
                                <a>{item}</a>
                                <FontAwesomeIcon icon={faInfo} size="lg" onClick={() => console.log( "info planet : " + item )}/>
                                <FontAwesomeIcon icon={faSpaceShuttle} transform={{rotate: 300}} size="lg"
                                                 onClick={() => console.log( "direction : " + item )}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
};

