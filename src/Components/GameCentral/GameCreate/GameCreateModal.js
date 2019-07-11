import React, { Component } from 'react'
import './GameCreateModal.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateNewGameID} from '../../../redux/adminReducer'

class GameCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_title: '',
      game_intro: '',
      newGameId: []
    }
  }

  handleInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleGameId = (data) => {
    this.state.newGameId=data[0].id
    updateNewGameID(data[0].id)
    // updateGameId(this.state.newGameId)
  }

  render() {
    const closeCreateModel = () => {
      this.props.callbackFromParent('false')
    }
    const opedAddQuestion = () => {
      this.props.callbackForAddQuestion('true')
    }

    const updateGameId = (data) => {
      this.props.callbackForupdateNewGameId(data)
    }

    const createGame = () => {
      let admins_id = (this.props.user.adminReducer.user.id)
      let game_title = (this.state.game_title)
      let game_intro = (this.state.game_intro)
      axios.post('/game/create',{admins_id,game_title,game_intro})///add the information we are sending over.
      .then(res => {
        updateGameId(res.data)
      })
    }


    const clickFunction = () => {
      closeCreateModel();
      createGame();
      opedAddQuestion();
      this.props.callbackgameFetch()
    }

    console.log(this.props)
    return (
      <div id='gameCreateModal' className='modal'>
        <div className='gameCreateModalContent'>
          <div className='gameCreateModalHeader'>
            <h3>Create Game</h3>
            <button onClick={closeCreateModel}>X</button>
          </div>
          <div className='CreateGameEntryCont'>
            <p>Game Title</p>
            <input
              type="text"
              name='game_title'
              onChange={this.handleInputUpdate}
            />
            <p>Game Instructions</p>
            <input
              type="text"
              name='game_intro'
              onChange={this.handleInputUpdate}
            />
            <div className='CreateGameEntryContBtn'>
              <button id='modalCreateBtn' onClick={clickFunction}>next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return{
    user:reduxState
  }
}

export default connect(mapStateToProps)(GameCreateModal)
