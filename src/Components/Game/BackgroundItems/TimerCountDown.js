import React, { Component } from 'react';
import '../GameQuestion.css';

class TimerCountDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerTime: 65000
        }
    }
    componentDidMount() {
        this.startTimer();
    }

    startTimer = () => {
        this.setState({
          timerOn: true,
          timerStart: this.state.timerTime
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - 1000;
          if (newTime >= 0) {
            this.setState({
              timerTime: newTime
            });
          } else {
            clearInterval(this.timer);
            this.setState({ timerOn: false });
              this.props.handleUpdateUser();
          }
        }, 1000);
      };

    render() {
        const { timerTime } = this.state;
        const newTime = timerTime / 1000
        return (
            <div className='spaceHeaderTimer'>
                <h1>{newTime}</h1>
            </div>
        )
    }
}

export default TimerCountDown;