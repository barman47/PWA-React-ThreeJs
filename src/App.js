import React, {Component} from 'react';
import logo from './textures/stars_bg.png';
import './App.css';
import ThreeContainer from './component/ThreeContainer'
import NavBarBottom from './component/NavBarBottom'

// On importe la classe `UserProvider`
import {Context} from "./store/Context";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {updatePresent: "non"};

        this.toggleAccueil = () => {
            this.setState(state => ({
                accueil:
                    state.accueil !== true,
            }));
        };

        this.state = {
            accueil: false,
            toggleAccueil: this.toggleAccueil,
        };

    }




    render() {
        return (
            <div>
                <Context.Provider value={this.state}>
                    <ThreeContainer/>
                    <NavBarBottom/>
                </Context.Provider>
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
