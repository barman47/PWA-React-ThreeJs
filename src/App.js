import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import ThreeContainer from './component/ThreeContainer'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { updatePresent: "non" };
    }

    render () {
        return (
            <ThreeContainer  />
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
    //             </header>
    //         </div>
    //     );
    // }
}


export default App;
