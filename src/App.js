import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import ThreeContainer from './component/ThreeContainer'
import NavBarBottom from './component/NavBarBottom'
import Main from './router/Main'

import Connexion from './page/Connexion'


// On importe la classe `UserProvider`
import {Context} from "./store/Context";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updatePresent: "non",
            accueil: false,
            toggleAccueil: this.toggleAccueil,
            optsThree: "",
            toUsers: false,
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
        this.setState({optsThree: opts}, () => {
            console.log("this.state.optsThree: ", this.state.optsThree);
        });
    }


    render() {
        return (


            <div>

                    <BrowserRouter>
                        <Main/>
                    </BrowserRouter>
                    :
                    <div>
                        <Context.Provider value={this.state}>
                            <ThreeContainer updateOptsThree={this.updateOptsThree}
                                            optsThreeGlobal={this.state.optsThree}/>

                            <NavBarBottom optsThreeGlobal={this.state.optsThree}
                                          updateOptsThree={this.updateOptsThree}/>
                        </Context.Provider>
                    </div>
                }

            </div>
        );
    }
}

export default App;
//< BackOffice deconnect={() => this.deconnect()}/>