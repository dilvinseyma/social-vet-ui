import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PetRegisteration from './components/PetRegisteration';
import PetSitterRegisteration from './components/PetSitterRegisteration';
import PetSearch from './components/PetSearch';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">SocialVet - Demo</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li> */}
                <li className="nav-item">
                  <Link to={'/petregisteration'} className="nav-link">PetRegisteration</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/petsitterregisteration'} className="nav-link">PetSitterRegisteration</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/search'} className="nav-link">Search</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          {/* <h2>Welcome to React CRUD Tutorial</h2> <br /> */}
          <Switch>
              <Route exact path='/petregisteration' component={ PetRegisteration } />
              <Route exact path='/petsitterregisteration' component={ PetSitterRegisteration } />
              <Route exact path='/search' component={ PetSearch } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;