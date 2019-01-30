import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, Redirect, withRouter} from 'react-router-dom'
import Connexion from '../page/Connexion'
import Planetarium from '../page/Planetarium'
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Background from "../image/voie.jpg";


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"


class Main extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <Route
                    render={({location}) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                classNames="fade"
                                timeout={300}
                            >
                                <Switch location={location}>

                                    <Route exact path='/' component={Connexion}/>
                                    <PrivateRoute path='/planetarium' component={Planetarium}/>
                                    <Route component={NoMatch}/>

                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}/>
            </div>

        );
    }
}


export default Main

function NoMatch({location}) {
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}


function PrivateRoute({component: Component, ...rest}) {

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('auth-token') != null ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
        ;
}


export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};