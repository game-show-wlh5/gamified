import React, { Component } from 'react'
import '../GameCreate/GameCreateModal.css'
import './AddQuestionModal.css'
import QuestionDisplay from './QuestionDisplay'
import { connect } from 'react-redux';
import axios from 'axios'
import {requestUserGames} from '../../../redux/adminReducer'

class AddQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games_id: this.props.MotherGame,
      question: '',
      remediation: '',
      answer: '',
      distractor1: '',
      distractor2: '',
      distractor3: '',
      gameQuestion: [],
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

  handleInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log(this.state)
  }

  render() {
    const motherGameid = this.props.MotherGame
    console.log(motherGameid, this.props)
    
    const closeAddQuestion = () => {
      this.props.closeAddQuestion('false')
    }

    const addQuestionFunction = () => {
      let games_id = motherGameid
    let question = (this.state.question)
    let remediation = (this.state.remediation)
    let answer = (this.state.answer)
    let distractor1 = (this.state.distractor1)
    let distractor2 = (this.state.distractor2)
    let distractor3 = (this.state.distractor3)
      console.log('made it to addquestion','games_id:',games_id)
      axios.post('/game/addquestion',{games_id,question,remediation,answer,distractor1,distractor2,distractor3} )
      .then(res => {
        console.log(res)
        this.setState({
        gameQuestion: [...this.state.gameQuestion, res.data[0]]
        })
      })
      this.setState({
      question: '',
      remediation: '',
      answer: '',
      distractor1: '',
      distractor2: '',
      distractor3: ''
      })
    }

    const doubleQuestion = () => {
      closeAddQuestion();
      addQuestionFunction()
    } 
    console.log(this.state)
    return (
      <div id='gameCreateModal' className='modal'>
        <div className='gameCreateModalContent'>
          <div className='gameCreateModalHeader'>
            <h3>Questions For: Game Title Here</h3>
            <button onClick={closeAddQuestion}>X</button>
          </div>
            <div className='CreateGameEntryContBtn'>
              <button 
              id='modalCreateBtn'
              onClick={addQuestionFunction}
              >add question</button>
          </div>
          
          
          <div className='CreateGameEntryCont'>
            <p>Question</p>
            <input
              type="text"
              name='question'
              onChange={this.handleInputUpdate}
              value={this.state.question}
            />
            <p>Remediation</p>
            <input
              type="text"
              name='remediation'
              onChange={this.handleInputUpdate}
              value={this.state.remediation}
            />
            <p>Answer</p>
            <input
              type="text"
              name='answer'
              onChange={this.handleInputUpdate}
              value={this.state.answer}
            />
            <p>Distractor</p>
            <input
              type="text"
              name='distractor1'
              onChange={this.handleInputUpdate}
              value={this.state.distractor1}
            />
            <p>Distractor</p>
            <input
              type="text"
              name='distractor2'
              onChange={this.handleInputUpdate}
              value={this.state.distractor2}
            />
            <p>Distractor</p>
            <input
              type="text"
              name='distractor3'
              onChange={this.handleInputUpdate}
              value={this.state.distractor3}
            />
          </div>
            <div className='questionDisplayCont'>
            {
              this.state.gameQuestion.map(question => {
                return(
                  <QuestionDisplay question={question} />
                )
              })
            }
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

export default  connect(mapStateToProps,{requestUserGames})(AddQuestionModal)
