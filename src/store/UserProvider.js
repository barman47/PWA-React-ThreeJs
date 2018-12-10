// store/UserProvider.js
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext`, et on initialise une
 * propriété par défaut : "name" qui sera une chaine vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const ThemeContext = createContext({
    theme: "light",
});

/**
 * la classe UserProvider fera office de... Provider (!)
 * en wrappant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessible de manière globale via le `Consumer`
 */
export default class ThemeProvider extends React.Component {
    state = {
        theme: "light", // une valeur de départ
    };
    toggleTheme = () => {
        this.setState(({theme}) => ({
            theme: theme === 'light' ? 'dark' : 'light',
        }))
    }

    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend ici
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <ThemeContext.Provider value={this.state.theme}>
                <button onClick={this.toggleTheme}>toggle theme</button>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

