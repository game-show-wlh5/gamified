import React, { Component } from 'react'
import QuestionDisplay from '../AddQuestionModal/QuestionDisplay'
import { connect } from 'react-redux';
import axios from 'axios'

class EditQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games_id: this.props.gameId.game.id,
      question: '',
      remediation: '',
      answer: '',
      distractor1: '',
      distractor2: '',
      distractor3: ''
    }
  }
  

  handleInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log(this.state)
  }

  render() {
    const motherGameid = this.props.gameId.game.id
    console.log(this.props.gameId.game.id)
    
    const closeEditQuestion = () => {
      this.props.callbackQuestion()
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
        console.log('addQuestion hit in Modal')
      })
    }

    const doubleQuestion = () => {
      closeEditQuestion();
      addQuestionFunction()
    } 
    console.log(this.state,this.props)
    let game_title = this.props.gameId.game.game_title
    return (
      <div id='gameCreateModal' className='modal'>
        <div className='gameCreateModalContent'>
          <div className='gameCreateModalHeader'>
            <h3>{`Edit Questions For:  ${game_title}`}</h3>
            <button onClick={closeEditQuestion}>X</button>
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
            />
            <p>Remediation</p>
            <input
              type="text"
              name='remediation'
              onChange={this.handleInputUpdate}
            />
            <p>Answer</p>
            <input
              type="text"
              name='answer'
              onChange={this.handleInputUpdate}
            />
            <p>Distractor</p>
            <input
              type="text"
              name='distractor1'
              onChange={this.handleInputUpdate}
            />
            <p>Distractor</p>
            <input
              type="text"
              name='distractor2'
              onChange={this.handleInputUpdate}
            />
            <p>Distractor</p>
            <input
              type="text"
              name='distractor3'
              onChange={this.handleInputUpdate}
            />
          </div>
            <div className='questionDisplayCont'>
            {/* <QuestionDisplay />
            <QuestionDisplay />
            <QuestionDisplay />
            <QuestionDisplay /> */}
          </div>
        </div>
        
      </div>





      // <div id='gameCreateModal' className='modal'>
      //   <div className='gameCreateModalContent'>
      //     <div className='headerContainer'>
      //       <header id='CreateModalHeader'>
      //       <h3>Create Game</h3>
      //       <button onClick={closeAddQuestion}>X</button>
      //       </header>
      //     </div>
      //       <div className='questionBtnContainer' >
      //         <button className='centralCreateButton' id='addQuestionButton'>ADD QUESTION</button>
      //       </div>
      //       <div className='questionContainer'>
      //         <div className='QuestionDetails'>
      //           <p>Question</p>
      //           <input 
      //           type="text" 
      //           className='questionDetailsInput'
      //           name='question'
      //           onChange={this.handleInputUpdate}
      //           />
      //           <p>Remediation</p>
      //           <input 
      //           type="text" 
      //           className='questionDetailsInput'
      //           name='remediation'
      //           onChange={this.handleInputUpdate}
      //           />
      //           <p>Answer</p>
      //           <input 
      //           type="text" 
      //           className='questionDetailsInput'
      //           name='answer'
      //           onChange={this.handleInputUpdate}
      //           />
      //           <p>Distractor 1</p>
      //           <input 
      //           type="text" 
      //           className='questionDetailsInput'
      //           name='distractor1'
      //           onChange={this.handleInputUpdate}
      //           />
      //           <p>Distractor 2</p>
      //           <input 
      //           type="text" 
      //           className='questionDetailsInput'
      //           name='distractor2'
      //           onChange={this.handleInputUpdate}
      //           />
      //           <p>Distractor 3</p>
      //           <input 
      //           type="text" 
      //           className='questionDetailsInput'
      //           name='distractor3'
      //           onChange={this.handleInputUpdate}
      //           />
      //           <p>spacer</p>
      //         </div>
      //       </div>
      //       <div className='questionDisplayContainer'>
      //         <div className='questionDisplay'>
      //           <QuestionDisplay/>
      //           <QuestionDisplay/>
      //           <QuestionDisplay/>
      //           <QuestionDisplay/>

      //         </div>
      //       </div>
      //   </div>
      // </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return{
    user:reduxState
  }
}

export default  connect(mapStateToProps)(EditQuestionModal)
