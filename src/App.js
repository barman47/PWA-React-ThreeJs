import React, {Component} from 'react';
import logo from './textures/stars_bg.png';
import './App.css';
import ThreeContainer from './component/ThreeContainer'
import NavBarBottom from './component/NavBarBottom'
import Modal from "./component/Modal";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {updatePresent: "non"};
    }

    render() {
        return (
            <div>

                <ThreeContainer/>
                <NavBarBottom/>
                <Modal/>

            </div>
        );
    }


    // render() {
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo"/>
    //                 <p>
    //                     Si je modifie  .
    //                 </p>
    //
    //                 <p> updatePresent : {this.state.updatePresent} </p>
    //
    //                 <a
    //                     className="App-link"
    //                     href="https://reactjs.org"
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     Learn React
    //                 </a>
    //                 <img src={logo}/>
    //
    //             </header>
    //         </div>
    //     );
    // }
}


export default App;
