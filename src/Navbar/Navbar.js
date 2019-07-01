import React, { Component } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu() {
    this.setState({showMenu: !this.state.showMenu});
  }

  render() {
    return (
        <nav>
          <div className='container'>
            <div className='title'>Game Show</div>
            <ul className='nav-links'>
              <li>GameList</li>
              <Link to='/gamecentral'>Game Central</Link>
              <Link to='/register'>Register</Link>
              <li>Account</li>
            </ul>
            <button className='nav-button' onClick={this.showMenu}>Menu &#9776;</button>
          </div>
            <div className={this.state.showMenu ? 'nav-menu nav-menu-show' : 'nav-menu'}>
              <ul className='nav-list'>
                <li>GameList</li>
                <li>GameCentral</li>
                <li>Register</li>
                <li>Account</li>
                
              </ul>
            </div>
        </nav>
    );
  }
}

        export default Navbar;