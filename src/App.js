import React, {Component} from 'react';
import './App.css';
import {BrowserRouter , HashRouter} from 'react-router-dom';
import Main from './router/Main'

// On importe la classe `UserProvider`
import {Context} from "./store/Context";


class App extends Component {
    render() {
        return (
            <HashRouter basename="/PWA-React-ThreeJs">
                <Main/>
            </HashRouter>
        );
    }
}

export default App;