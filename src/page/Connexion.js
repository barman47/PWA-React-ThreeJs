import React, {Component} from 'react';
import '../style/Connexion.css'
import Background from '../image/voie.jpg';
import * as ServiceRecupDonneesBDD from '../service/ServiceRecupDonneesBDD';
import {Redirect, withRouter} from 'react-router';

import {fakeAuth} from '../router/Main'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

class Connexion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: 'Nathan1@',
            saveEmail: true,
        };


        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* Au lancement de la page appelle la fonction qui récupère
    l'email de l'utilisateur dernièrement connecté. */
    componentWillMount() {
        this.check();
    }

    /* Récupération de l'email  stocker dans le storage
    pour l'afficher dans les champs correspondant. */
    check = () => {
        this.setState({
            email: localStorage.getItem('email'),
        });
        if (localStorage.getItem('check') === "1") {
            this.setState({saveEmail: true})
        } else {
            this.setState({saveEmail: false})
        }
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
    }


    handlePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    saveEmail = (event) => {
        event.currentTarget.checked ?
            this.setState({saveEmail: true})
            :
            this.setState({saveEmail: false})
    }

    handleSubmit = (event) => {
        let email = this.state.email;
        let pass = this.state.password;
        if (email === null || pass === null || pass === '' || email === '') {
            alert('Veuillez remplir tous les champs correctement');
        } else {
            /* Envoie de l'email et du mot de passe pour connecter la personne. */
            ServiceRecupDonneesBDD.fetchLogin(email, pass)
                .then(response => {
                    if (response.status === 200) {

                        /* Récupération du token généré par le serveur
                        pour l'envoyer dans le stockage de l'application. */
                        let recupToken = response.headers.get("token");
                        localStorage.setItem('auth-token', JSON.stringify(recupToken));


                        ServiceRecupDonneesBDD.RecupUsers()
                            .then(response => response.json())
                        if (localStorage.getItem('auth-token') != null) {
                            localStorage.removeItem('discover');
                            this.props.history.push('/planetarium')

                        }


                    } else {
                        alert('Mauvais mot de passe ou mauvais email');
                    }
                })
                .catch(error => {
                    console.error(error);
                })
            if (!(email === null) && this.state.saveEmail === true) {

                /* Stockage de l'email dans le storage de l'application.
                Sert pour que la personne n'ai pas à indiquer son email et mot de passe
                à chaque lancement d'application. */
                localStorage.setItem('email', email);
                localStorage.setItem('check', "1");
                this.setState({
                    email: email,
                });
            } else {
                localStorage.setItem('check', "0");
                localStorage.removeItem('email');
                this.setState({email, password: ''})
            }
            event.preventDefault();
        }
    }

    discover = () => {

        localStorage.removeItem('auth-token')

        if (localStorage.getItem('auth-token') === null) {
            localStorage.setItem('discover', true);
            this.props.history.push('/planetarium')
        }
    }

    render() {
        return (

            <div className="connexion" style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover'
            }}>
                <div className="titre">
                    <h1>Open Stars</h1>
                    <h3>Planétarium</h3>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" className="infoUser" placeholder="Email" value={this.state.email}
                           onChange={this.handleEmail}/>
                    <input type="password" className="infoUser" placeholder="Mot de passe"
                           value={this.state.password} onChange={this.handlePassword}/>
                    <input type="submit" value="Connexion" className="buttonConnexion"/>
                </form>
                <button className="buttonPopup"
                        onClick={this.discover}>
                    <h3> Découvrir </h3>
                    <FontAwesomeIcon className="arrow" icon={faAngleRight}/>
                </button>
            </div>

        );
    }
}

export default Connexion;