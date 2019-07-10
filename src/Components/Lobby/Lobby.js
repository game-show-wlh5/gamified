import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  loadGameDetails,
  setGameID,
  lobbyUsers
} from "../../redux/userReducer";
import io from "socket.io-client";
import "./Lobby.css";
import ReactAudioPlayer from 'react-audio-player';
import song from "../../Assets/GameLogin.wav";

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      currentUsers: [],
      game: "",
      startGame: false
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("room joined", data => {
      this.joinSuccess(data);
    });
    this.joinRoom();
    const { id } = this.props.match.params;
    axios
      .get(`/getgame/${id}`)
      .then(res => {
        this.props.loadGameDetails(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        this.props.history.push("/join");
        console.log(err.message);
      });
  }

  joinRoom = () => {
    this.socket.emit("join room", this.props.match.params.id)
  };
  joinSuccess = currentUsers => {
    // console.log(currentUsers);
    this.props.lobbyUsers(currentUsers);
  };

  leaveRoom = () => {
    this.socket.emit(
      "leave room",
      this.props.gameInfo.username,
      this.props.gameInfo.gameID
    );
    window.alert('Left game');
    this.props.history.push("/join");
  };

  userLeave = (username) => {
    axios.delete(`/deleteuser?username=${username}`)
      .then(res => {
        console.log(res)
        console.log(this.props)
        this.props.history.push("/join")
      })
  }

  toggleStartGame = () => {
    this.setState({
      startGame: true
    });
    this.props.history.push("/game");
  };

  render() {
    // console.log(this.props);
    const currentSession = this.props.gameInfo.users.map((ele, i) => {
      // console.log(ele);
      return <p key={i}>{ele.username}</p>;
    });
    return (
      <div>
        <div className="lobbyContainer">
          <div className="lobbybox" />
            <div className="game-title">Game Title</div>
            <div className="lobbyDescription">
              Game Instructions: <br />
              {this.props.gameInfo.game_intro}
            </div>
            <h2>Users in lobby</h2><br />
            <div className="lobbyUsers">
              {currentSession}
            </div>
            <button className="lobbyBtn" onClick={this.toggleStartGame}>
              Start Game
            </button>
            <br />
            <button className="leaveBtn" onClick={e => this.userLeave(this.props.gameInfo.username.username)}>
              Leave Game
            </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    gameInfo: reduxState.userReducer
  };
}

const mapDispatchToProps = {
  loadGameDetails,
  setGameID,
  lobbyUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
