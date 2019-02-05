import React, {Component} from 'react';
import moment from 'moment';
import Moment from 'react-moment';
//import ModalStatus from './ModalStatus';
import '../style/Status.scss';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faPlus, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import LinesEllipsis from 'react-lines-ellipsis'

moment.locale('fr');

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.user.statusActuel.concat(this.props.user.statusArchive).sort((a, b) => b.idFilActualite - a.idFilActualite),
            currentPage: 1,
            photoParPage: 3,
            currentStatus: [],
            showMore: true
        }
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

            currentStatus: this.state.currentStatus.concat(this.state.status.slice(this.state.indexOfFirstPhoto, this.state.indexOfLastPhoto)),
            currentPage: currentPage + 1,
        });

        if (this.state.nbrStatus <= (this.state.indexOfFirstPhoto + this.state.photoParPage)) {


            await this.setState({
                showMore: false
            });
        }


    }

    componentWillMount() {
        this.setState({
            nbrStatus: this.state.status.length,
        })

        this.handleClick()
    }


    render() {
        return (
            <div className={"row gallery "} id="photo">
                <div className="scrollHoriz">
                    {
                        this.state.currentStatus.map((status, index) => (


                                <div key={index} className="statue carte" onClick={() => this.onOpenModal(index)}>
                                    <div className="infoStatus">
                                        <div>

                                            <div className="texteStatu">

                                                <LinesEllipsis
                                                    text={status.status}
                                                    maxLine='2'
                                                    ellipsis='...'
                                                    trimRight
                                                    basedOn='letters'
                                                />
                                            </div>


                                            <label>Publié {moment(status.publicationDate).fromNow()}</label>
                                        </div>

                                        <div className="containerIconStatus">
                                            <div>{(status.nbLikeStatus === null ? status.numberLikeArchive : status.nbLikeStatus)}

                                            </div>

                                            <FontAwesomeIcon
                                                icon={faThumbsUp} size="lg"/>

                                            <div>{status.numberCommentaire}

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

export default Status;