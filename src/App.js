import React, {Component} from 'react';
import './App.css';
import ThreeContainer from './component/ThreeContainer'
import NavBarBottom from './component/NavBarBottom'

// On importe la classe `UserProvider`
import {Context} from "./store/Context";


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

}


export default App;
