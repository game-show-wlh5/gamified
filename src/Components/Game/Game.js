import React, { Component } from 'react';
import axios from 'axios';
import GameQuestion from './GameQuestion';
import LeaderBoard from './LeaderBoard';
import { connect } from 'react-redux'
import {
    loadGameDetails,
    setGameID,
    lobbyUsers,
    userScore
} from "../../redux/userReducer";
import socket from '../Sockets';
import './Game.css';
import ReactAudioPlayer from 'react-audio-player'
import song from '../../Assets/GameTheme.wav'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            completedToggle: false,
            score: 0,
            timer: 30,
            username: '',
            users: [],
            userID: null,
            questions: []
        }
    }

    componentDidMount() {
        this.handleGetGame();
        socket.on('finishedGame', (data) => {
            this.setState({
                users: data
            })
        })
    }

    handleGetGame = () => {
        // axios call to get game questions
        const { gameID } = this.props.gameInfo;
        // console.log('here', gameID)
        const { username, id } = this.props.gameInfo.username;
        axios.get(`/questions/${gameID}`)
            .then(res => {
                // console.log('res', res.data)
                const questions = res.data
                console.log('questions', questions)
                this.setState({
                    username: username,
                    userID: id,
                    questions
                })
            })
    }


    handleScoreUpdate = () => {
        let { score } = this.state;
        let newScore = score += 100;
        this.setState({
            score: newScore
        })
    }

    handleGameCompledToggle = () => {
        this.setState({
            completedToggle: true
        })
    }

    handleUpdateUser = () => {
        const { gameID } = this.props.gameInfo;
        const { username, userID, score } = this.state;
        socket.emit('finish game', { gameID, username, userID, score })
        this.handleGameCompledToggle()
    }


    render() {

        console.log('gamestate', this.state.questions)
        const { users } = this.state
        const { score, questions, username } = this.state;
        return (
            <div className='playGameCont'>
                <ReactAudioPlayer src={song} autoPlay loop />
                {(this.state.completedToggle === false)
                    ? (
                        <div>
                            {(questions.length === 0)
                                ? (
                                    <div>waiting</div>
                                ) : (
                                    <GameQuestion
                                        handleScoreUpdate={this.handleScoreUpdate}
                                        questions={questions}
                                        handleUpdateUser={this.handleUpdateUser}
                                        score={score}
                                        username={username} />
                                )}
                        </div>
                    ) : (
                        <div>
                            <LeaderBoard
                                score={score}
                                username={username}
                                users={users} />
                        </div>
                    )}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        gameInfo: reduxState.userReducer
    }
}

const mapDispatchToProps = {
    loadGameDetails,
    setGameID,
    lobbyUsers,
    userScore
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);