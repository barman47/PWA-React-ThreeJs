import React, {Component} from 'react';
import logo from './textures/stars_bg.png';
import './App.css';
import ThreeContainer from './component/ThreeContainer'
import NavBarBottom from './component/NavBarBottom'

// On importe la classe `UserProvider`
import {Context} from "./store/Context";
import {faCompass, faParachuteBox} from "@fortawesome/free-solid-svg-icons";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updatePresent: "non",
            accueil: false,
            toggleAccueil: this.toggleAccueil
        };

        // test de l'api context de react : store global disponible dans les composants
        this.toggleAccueil = () => {
            this.setState(state => ({
                accueil:
                    state.accueil !== true,
            }));
        };
    }

    updateOptsThree = (opts) => {
        this.setState({
            optsThree: opts
        })

    }


    render() {
        return (
            <div>
                <Context.Provider value={this.state}>
                    <ThreeContainer updateOptsThree={this.updateOptsThree}/>
                    <NavBarBottom optsThree={this.state.optsThree}/>
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
