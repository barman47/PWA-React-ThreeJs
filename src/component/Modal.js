import React, {Component} from 'react';
import Search from '../threejs/planetarium/sceneActions/search'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobe, faInfo, faSpaceShuttle, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'

// function ListItem(props) {
//     // Correct! There is no need to specify the key here:
//     return (
//         <li className="">
//             <FontAwesomeIcon icon={faGlobe} size="lg"/>
//             <a>{props.value}</a>
//             <FontAwesomeIcon icon={faInfo} size="lg" onClick={() => console.log("coucou boum  ")}/>
//             <FontAwesomeIcon icon={faSpaceShuttle} transform={{rotate: 300}} size="lg"
//                              onClick={() => console.log("coucou boum  ")}/>
//         </li>
//     )
//
// }
//
// function NumberList(props) {
//     const planets = props.planets;
//     const listItems = planets.map((number) =>
//         // Correct! Key should be specified inside the array.
//         <ListItem key={number.toString()}
//                   value={number}/>
//     );
//     return (
//         <ul>
//             {listItems}
//         </ul>
//     );
// }
// //
// // const planets = ["Moon", "Saturn", "Uranus", "Jupiter", "Mars", "Mercury", "Venus", "Neptune"];
//
//
//  class Modal extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             initialItems: [["Moon", "Saturn", "Uranus", "Jupiter", "Mars", "Mercury", "Venus", "Neptune"]],
//             items: []
//         }
//     }
//
//
//     filterList(event) {
//         var updatedList = this.state.initialItems;
//         updatedList = updatedList.filter(function (item) {
//             return item.toLowerCase().search(
//                 event.target.value.toLowerCase()) !== -1;
//         });
//         this.setState({items: updatedList});
//     }
//
//
//     componentWillMount() {
//         this.setState({items: this.state.initialItems})
//     }
//
//
//     render() {
//         // Render nothing if the "show" prop is false
//         if (!this.props.show) {
//             return null;
//         }
//
//         // The gray background
//         const backdropStyle = {
//             position: 'fixed',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: 'rgba(0,0,0)',
//             padding: 50
//         };
//
//         return (
//
//
//             <div id="myModal" className="modal">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <FontAwesomeIcon className="close" icon={faTimes} size="lg" onClick={this.props.onClose}/>
//
//
//                         <h3>
//                             <FontAwesomeIcon icon={faSearch} size="lg"/>
//                             <input id="search"
//                                    type="search"
//                                    placeholder="Recherche"
//                                    onChange={this.filterList}/>
//                         </h3>
//                     </div>
//
//                     <div id="listPlanete">
//
//                         <h3> Planètes </h3>
//
//                         <NumberList planets={this.props.items}/>
//
//                     </div>
//
//                 </div>
//             </div>

//
//         );
//     }
// }
//

export default class FilteredList extends React.Component {

    constructor() {
        super()
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
        if(!this.props.show) {
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


            // <div className="filter-list">
            //     <form>
            //         <fieldset className="form-group">
            //             <input type="text" className="form-control form-control-lg" placeholder="Search"
            //                    onChange={this.filterList}/>
            //         </fieldset>
            //     </form>
            //     <List items={this.state.items}/>
            // </div>
        );
    }
}


function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return (
        <li className="">
            <FontAwesomeIcon icon={faGlobe} size="lg"/>
            <a>{props.value}</a>
            <FontAwesomeIcon icon={faInfo} size="lg" onClick={() => console.log("coucou boum  ")}/>
            <FontAwesomeIcon icon={faSpaceShuttle} transform={{rotate: 300}} size="lg"
                             onClick={() => console.log("coucou boum  ")}/>
        </li>
    )

}

class List extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.items.map(function (item) {
                        return (
                            <li>
                                <FontAwesomeIcon icon={faGlobe} size="lg"/>
                                <a>{item}</a>
                                <FontAwesomeIcon icon={faInfo} size="lg" onClick={() => console.log("coucou boum  ")}/>
                                <FontAwesomeIcon icon={faSpaceShuttle} transform={{rotate: 300}} size="lg"
                                                 onClick={() => console.log("coucou boum  ")}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
};

