import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class GameEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game_title: this.props.gameId.game.game_title,
      game_intro: this.props.gameId.game.game_intro,
      gameQuestion: []
    }
  }
  
  handleInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  // handleQuestionRequest = () => {
  //   axios.
  // }
  
  render() {
    const closeEditModel = () => {
      this.props.callbackFromParent('false')
    }
    const opedAddQuestion = () => {
      this.props.callbackForAddQuestion('true')
    }

    const callbackQuestion = () => {
      this.props.callbackQuestion()
    }
    // const updateGameId = (data) => {
    //   this.props.callbackForupdateNewGameId(data)
    // }

    const editGame = () => {
      let game_id = (this.props.gameId.game.id)
      let game_title = (this.state.game_title)
      let game_intro = (this.state.game_intro)
      axios.put('/game/edit',{game_id,game_title,game_intro})///add the information we are sending over.
      .then(console.log('Game Update'))
    }


    const clickFunction = () => {
      editGame();
      callbackQuestion();
      closeEditModel();
    }

    const name = 'bob'
    return (
      <div id='gameCreateModal' className='modal'>
        <div className='gameCreateModalContent'>
          <div className='gameCreateModalHeader'>
            <h3>Create Game</h3>
            <button onClick={closeEditModel}>X</button>
          </div>
          <div className='CreateGameEntryCont'>
            <p>Game Title</p>
            <input
              type="text"
              name='game_title'
              onChange={this.handleInputUpdate}
              value={this.state.game_title}
            />
            <p>Game Instructions</p>
            <input
              type="text"
              name='game_intro'
              onChange={this.handleInputUpdate}
              value={this.state.game_intro}
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

export default connect(mapStateToProps)(GameEditModal)
