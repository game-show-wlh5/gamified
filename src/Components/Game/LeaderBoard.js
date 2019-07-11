import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './LeaderBoard.css';

class LeaderBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {

    }

    handleRemoveUser = (username) => { 
        axios.delete(`/removeuser?username=${username}`)
        .then(res => {
          this.props.history.push("/")
            
        })
    }


    render() {
        console.log('LB props', this.props)
        const { users, username } = this.props;
        const currentSession = users.map((ele, i) => {
            return <div className='usernameScoreCont' key={i}>
                <h3>{ele.username}</h3>
                <h3>{ele.score}</h3>
            </div>;
        });
        return (
            <div className='leaderBoardCont'>
                <div className='leaderBoardBoxsCont'>
                    <div className='leaderUsersBox'>
                        <h1>Leader Board</h1>
                        {currentSession}
                        <button onClick={e => this.handleRemoveUser(username)}>LEAVE GAME</button>
                    </div>
                    <div className='leaderImgBox'>
                        <img src='https://yellingyak.com/wp-content/uploads/2019/07/rr_logo.png' alt='img' />
                    </div>
                </div>
            </div>
        )
    }
}




export default withRouter(LeaderBoard);