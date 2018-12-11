import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faImages} from '@fortawesome/free-solid-svg-icons'


export default class ButtonsPhoto extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
    }

    render() {
        return (

                <div  id="btn-photo">
                    <a href="OpenStars://">
                        <button > Nouvelle Photo
                            <FontAwesomeIcon icon={faCamera} size="lg" style={{paddingLeft : 5 , paddingRight : 5 }} />
                        </button>
                    </a>

                    <button > Galerie Photo
                        <FontAwesomeIcon icon={faImages} size="lg" style={{paddingLeft : 5 , paddingRight : 5 }} />
                    </button>

                </div>

        );
    }
}








