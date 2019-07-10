// import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
// import Signup from './components/sign-up';
// import LoginForm from './components/login-form';
// import Navbar from './components/navbar';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loggedIn: false,
//       username: null,
//       error: null,
//       isLoaded: false,
//       items: []
//     },
//     this.getUser = this.getUser.bind(this)
//     this.componentDidMount = this.componentDidMount.bind(this)
//     this.updateUser = this.updateUser.bind(this)
//   };

//   componentDidMount() {
//     this.getUser()
//     fetch("https://api.the-odds-api.com/v3/odds?sport=soccer_epl&region=uk&mkt=h2h&apiKey=68167223b9315fb382f106b4e105f92e")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           console.log(result)
//           this.setState({
//             isLoaded: true,
//             items: result.data
//           });
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         });
//   };

//   updateUser(userObject) {
//     this.setState(userObject)
//   };

//   getUser() {
//     axios.get('http://localhost:3001/user').then(response => {
//       console.log('Get user response: ')
//       console.log(response.data)
//       if (response.data.user) {
//         console.log('Get User: There is a user saved in the server session: ')

//         this.setState({
//           loggedIn: true,
//           username: response.data.user.username
//         })
//       } else {
//         console.log('Get user: no user');
//         this.setState({
//           loggedIn: false,
//           username: null
//         });
//       };
//     });
//   };

//   render() {
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <div className="App">
//           <Navjawn updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
//           {/* greet user if logged in: */}
//           {this.state.loggedIn &&
//             <p>Welcome to the party, {this.state.username}!</p>}
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <a className="navbar-brand" href="#">
//               Ubetcha{" "}
//             </a>
//           </nav>
//           <div> {items.map(item => (
//             <Card bg="dark" text="white" style={{ width: '22rem' }}>
//               <Card.Body>
//                 <Card.Title>{item.teams[0]} vs {item.teams[1]}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{item.home_team} at Home</Card.Subtitle>
//                 <Card.Text>
//                   League: {item.sport_nice}
//                 </Card.Text>
//                 <Card.Text>
//                   Time: {(item.commence_time)}
//                 </Card.Text>
//                 <Card.Subtitle>Bet On:  </Card.Subtitle>
//                 <Button href="#" variant="outline-dark">{item.teams[0]}</Button>
//                 <Button href="#" variant="outline-dark">{item.teams[1]}</Button>
//               </Card.Body>
//             </Card>
//           ))}
//           </div>

//           {/* Routes to different components */}
//           <Route
//             exact path="/"
//             component={Home} />
//           <Route
//             path="/login"
//             render={() =>
//               <LoginForm
//                 updateUser={this.updateUser}
//               />}
//           />
//           <Route
//             path="/signup"
//             render={() =>
//               <Signup />}
//           />

//         </div>
//       );
//     };
//   };
// };

// export default App;
