import './QuestionDisplay.css'
import axios from 'axios'
import React,{Component} from 'react'


class QuestionDisplay extends Component {

  handleDeleteQuestion = () => {
    axios.delete(`/deletequestion/${this.props.question.id}`)
    .then(res => {
      console.log('Deleted question')
    })
}
  render() {
    console.log(this.props.question.id,this.props)
    
    return(
      <>
      <div className='questionCard'>
        <div>{this.props.question.question}</div>
        <div className='qBtnContainer'>
          <button>Edit</button>
          <button
          onClick={this.handleDeleteQuestion}
          >Delete</button>
        </div>
      </div>
      </>
    )
  }
}

export default QuestionDisplay