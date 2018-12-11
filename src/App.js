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
            btnLocalisation: faCompass,
            accueil: false,
            toggleAccueil: this.toggleAccueil
        };

        this.toggleAccueil = () => {
            this.setState(state => ({
                accueil:
                    state.accueil !== true,
            }));
        };
    }

    onLocalisationClick = () => {
        this.setState({
            btnLocalisation: faParachuteBox
        })
    }


    render() {
        return (
            <div>
                <Context.Provider value={this.state}>
                    <ThreeContainer onLocalisationClick={this.onLocalisationClick}/>
                    <NavBarBottom btnLocalisation={this.state.btnLocalisation}/>
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
