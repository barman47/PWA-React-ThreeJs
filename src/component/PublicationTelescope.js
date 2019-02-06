import React, {Component} from 'react';
import moment from "moment";
import 'moment/locale/fr';
import '../style/Status.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faThumbsUp,
    faComments,
    faPlus
} from "@fortawesome/free-solid-svg-icons"
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import Popup from "./ModalRecherche";
import LinesEllipsis from 'react-lines-ellipsis';


moment.locale('fr');


class PublicationTelescope extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.user.picturePublications.sort((a, b) => b.idPublication - a.idPublication),
            currentPage: 1,
            photoParPage: 3,
            currentPhotos: [],
            showMore: true

        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {

        const {currentPage, photoParPage} = this.state;


        await this.setState({

            indexOfLastPhoto: currentPage * photoParPage,
        });

        await this.setState({

            indexOfFirstPhoto: this.state.indexOfLastPhoto - photoParPage,
        });


        this.setState({

            indexOfLastPhoto: currentPage * photoParPage,
            indexOfFirstPhoto: this.state.indexOfLastPhoto - photoParPage,

            currentPhotos: this.state.currentPhotos.concat(this.state.photos.slice(this.state.indexOfFirstPhoto, this.state.indexOfLastPhoto)),
            currentPage: currentPage + 1,
        });

        if (this.state.nbrPhotos <= (this.state.indexOfFirstPhoto + this.state.photoParPage)) {

            await this.setState({
                showMore: false
            });
        }


    }


    componentWillMount() {
        this.setState({
            nbrPhotos: this.state.photos.length,
        })

        this.handleClick()
    }

    render() {

        return (


            <div className={"row gallery "} id="photo">
                <div className="scrollHoriz">

                    {
                        this.state.currentPhotos.map((publi, index) => (


                                <div key={index}
                                     className="photoCarte carte"
                                >
                                    {publi.pathPicture &&
                                    <div className="photopublie"
                                         style={{backgroundImage: `url(data:image/jpeg;base64,${publi.pathPicture})`}}>
                                    </div>
                                    }

                                    <div className="infoStatus">
                                        <div>

                                            <div className="texteStatu">

                                                <LinesEllipsis

                                                    text={publi.description}
                                                    maxLine='3'
                                                    ellipsis='...'
                                                    trimRight
                                                    basedOn='letters'
                                                />
                                            </div>

                                            <label>Publié {moment(publi.publicationDate).fromNow()}</label>
                                        </div>

                                        <div className="containerIconStatus">
                                            <div>{publi.numberLike}

                                            </div>

                                            <FontAwesomeIcon
                                                icon={faThumbsUp} size="lg"/>

                                            <div>{publi.numberCommentaire}

                                            </div>
                                            <FontAwesomeIcon icon={faComments}
                                                             size="lg"/>
                                        </div>

                                    </div>
                                </div>

                            )
                        )
                    }

                    {this.state.showMore && <div className="more" onClick={this.handleClick}>

                        <FontAwesomeIcon
                            icon={faPlus} size="lg"/>

                    </div>}
                    <div style={{padding: "5px"}}>

                    </div>

                </div>

            </div>
        );
    }
}

export default PublicationTelescope;