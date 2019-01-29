import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './router/Main'

// On importe la classe `UserProvider`
import {Context} from "./store/Context";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        );
    }
}

export default App;
//< BackOffice deconnect={() => this.deconnect()}/>