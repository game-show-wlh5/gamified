import React, { Component } from 'react'
import './GameCentral.css'
import GameCreateModal from '../GameCreate/GameCreateModal'
import AddQuestionModal from '../AddQuestionModal/AddQuestionModal'
import {connect} from 'react-redux'
import {requestUserGames} from '../../../redux/adminReducer'
import GameDisplayCard from '../GameDisplay/GameDisplayCard'

class GameCentral extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CreateModal: 'false',
      AddQuestion: 'false',
      NewGameId: ''
    }
  }

  componentDidMount() {
    let userInfo = (this.props.user.adminReducer.user)
    this.props.requestUserGames(userInfo)
    console.log('Request Games firing',this.props)
  }

  componentDidUpdate(){
    let userInfo = (this.props.user.adminReducer.user)
    this.props.requestUserGames(userInfo)
    console.log('Request Games firing',this.props)
  }
  //  userCheck = () => {
  //    let userInfo = (this.props.user.adminReducer.user)
  //    console.log(this.props)
  //    if (userInfo == '') {
  //      this.props.history.push('/')
  //   } else {
  //     console.log('got to else statement')
  //   }

  // }

  // componentDidMount = async () => {
  //   console.log('got to DidMount')
  //   this.userCheck()
  // }


  render() {

    const openCreateModel = () => {
      this.setState({
        CreateModal: 'true'
      })
    }

    const openAddQuestion = () => {
      this.setState({
        AddQuestion: 'true'
      })
    }

    const closeCreateModel = (dataFromChild) => {
      this.setState({
        CreateModal: dataFromChild
      })
    }

    const closeAddQuestion = (dataFromChild) => {
      this.setState({
        AddQuestion: dataFromChild
      })
    }

    const updateNewGameId = (dataFromChild) => {
      this.setState({
        NewGameId: dataFromChild
      })
      this.setState({
        NewGameId:this.state.NewGameId[0].id
      })
    }
    let games = this.props.user.adminReducer.game
    let game = games.map(game => <GameDisplayCard key={game.id} game={game} />)

    return ( 

      <div className='gameCentCont'>
        <div className='gameCentralHeader'>
          <h2>Game Central</h2>
        </div>
        <div>
          <div className='createGameContainer' >
            <button id='createGameModal' onClick={openCreateModel}>create game</button>

            {this.state.CreateModal !== 'false'
              ? <GameCreateModal createDisplay={this.state.CreateModal} callbackFromParent={closeCreateModel} callbackForupdateNewGameId={updateNewGameId} callbackForAddQuestion={openAddQuestion} />
              : null
            }

            {this.state.AddQuestion !== 'false'
              ? <AddQuestionModal closeAddQuestion={closeAddQuestion} MotherGame = {this.state.NewGameId}/>
              : null
            }
            {/* <GameCreateModal/>
              <AddQuestionModal closeAddQuestion={closeAddQuestion}/>  */}
          </div>
          <div className='gamesDisplay'>
            {game}
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


export default connect(mapStateToProps,{requestUserGames})(GameCentral)