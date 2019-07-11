import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import BgDirt from './BackgroundItems/BgDirt';
import Cockpit from './BackgroundItems/Cockpit';
import Question from './BackgroundItems/Question';
import Spaceship from './BackgroundItems/Spaceship';

import './GameQuestion.css';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            remediationShowing: false,
            question: {},
            questions: [],
            questionCount: null
        }
    }

    componentDidMount() {
        this.handleGetQuestion()
    }

    handleGetQuestion = () => {
        console.log('gq', this.props)
        const { questions } = this.props
        let questionCount = questions.length
        this.setState({
            questionCount,
            questions,
            question: questions[questionCount - 1]
        })
    }

    handleAnswerClicked = (e) => {
        if (e.target.value === this.state.question.answer) {
            console.log('correct')
            this.props.handleScoreUpdate();
        } else {
            console.log('incorrect')
        }
        this.handleRemediationToggle();
    }

    handleRemediationToggle = () => {
        this.setState({
            remediationShowing: !this.state.remediationShowing
        })
    }

    handleNextQuestion = () => {
        let { questionCount, questions } = this.state;
        let newCount = questionCount -= 1
        let newQuestion = questions[newCount - 1]
        console.log('new', newCount)
        console.log('qC', questionCount)
        if (questionCount !== 0) {
            this.setState({
                questionCount: newCount,
                question: newQuestion
            })
            this.handleRemediationToggle();
        } else if (questionCount === 0) {
            console.log('quiz completed')
            this.props.handleUpdateUser();
        }
    }

    handleRandomAnswers = () => {
        const { answer, distractor1, distractor2, distractor3 } = this.state.question;
        const answersArr = [answer, distractor1, distractor2, distractor3];
        let i = answersArr.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = answersArr[i];
            answersArr[i] = answersArr[j];
            answersArr[j] = temp;
        }
        return answersArr
    }

    render() {
        const { username } = this.props;
        const randomAnswers = this.handleRandomAnswers();
        const answerBtns = randomAnswers.map((answerChoice, ind) => {
            return (
                <div key={ind}><button value={answerChoice} onClick={this.handleAnswerClicked}>{answerChoice}</button></div>
            )
        })
        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ tension: 200, friction: 7 }} >
                {props => (<div style={props}>
                    
                    <div className='spaceIntroCont'>
                        <div className='spaceQuestionCont'>
                            <Question
                                answerBtns={answerBtns}
                                state={this.state}
                                handleNextQuestion={this.handleNextQuestion}/>
                        </div>
                        <div className='spaceCockpitCont'>
                            <Cockpit
                                score={this.props.score}
                                handleUpdateUser={this.props.handleUpdateUser}
                                username={username}/>
                        </div>
                        <div className='spaceShip'>
                            <Spaceship />
                        </div>
                        <BgDirt />
                    </div>

                </div>)}</Spring>
        )
    }
}

export default Game;


