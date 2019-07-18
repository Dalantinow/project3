import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Navjawn from './components/navbar';
import Home from './components/home';
import LiveScores from './components/liveScores';
import News from './components/news'
import Footer from './components/footer'
import GamePage from './components/game';
import ConcludedScores from './components/concludedScores';
import "./App.css";


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  };

  componentDidMount() {
    this.getUser();
  };

  updateUser(userObject) {
    this.setState(userObject)
  };

  getUser() {
    axios.get('http://localhost:3001/user').then(response => {
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      };
    });
  };

  render() {
    return (
      <div className="App">
        <Navjawn updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Welcome the party, {this.state.username}!</p>
        }

        {/* Routes to different components */}
        <Route
        updateUser={this.updateUser} loggedIn={this.state.loggedIn}
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup />}
        />
        <Route
        updateUser={this.updateUser} loggedIn={this.state.loggedIn}
          path="/livescores"
          render={() =>
            <LiveScores />}
        />
        <Route
          path="/concludedscores"
          render={() =>
            <ConcludedScores />}
        />
        <Route
        updateUser={this.updateUser} loggedIn={this.state.loggedIn}
          path="/bid/:id"
          render={() =>
            <GamePage />}
        />
        <Route
        updateUser={this.updateUser} loggedIn={this.state.loggedIn}
          path="/news"
          render={() =>
            <News />}
        />
       
          <Footer className="footer"/>
          <script src="https://unpkg.com/react/umd/react.production.js" crossorigin="true" />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.js"
          crossorigin="true"
        />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin="true"
        />
        <script>var Alert = ReactBootstrap.Alert;</script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
      </div>
    );
  };
};

export default App;
