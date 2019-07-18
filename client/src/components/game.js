import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: {},
      bidamount: undefined,
      isLoaded: false,
      credits: null,
      currentBid: {},
      loggedIn: undefined
    }
  }
  componentDidMount() {
    this.getUser();
    var userObject = localStorage.getItem("userObject");
    console.log("retrievedObject", JSON.parse(userObject));
    this.setState({
      credits: userObject.credits
    })
    console.log(this.state.credits)
    Axios.get("http://localhost:3001/bid")
      .then((result) => {
        this.setState({
          isLoaded: true,
          bid: result.data
        },() => {
          for (var i = 0; i < result.data.length; i++) {
            if (("/bid/" + result.data[i]._id) === window.location.pathname) {
              this.setState({
                currentBid: result.data[i]
              })
              
            }
          }
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }

  getUser() {
    Axios.get('http://localhost:3001/user').then(response => {
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          credits: response.data.user.credits
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
  handleSubmit(event) {
    event.preventDefault()
    Axios
      .put('http://localhost:3001/user/login', {
       credits: (this.state.credits - this.state.bidAmount)
      })
      .then(response => {
          console.log(response)
          console.log("Wager Placed!")
          this.setState({
            redirectTo: '/'
          })
      }).catch(error => {
        console.log('login error: ')
        console.log(error);
      });
      
      Axios.put('http://localhost:3001/bid', {
        teamOneBidAmount: this.state.bidAmount,
        teamOneBettorId: this.state.username,
        betPlaced: true
      })
  };
  render() {

    const { bid, isLoaded, loggedIn, credits, bidAmount, currentBid } = this.state;
    if (!isLoaded) {
      return <Spinner animation="grow" variant="warning" />
    } else {
      return (

        <Col md={{ span: 6, offset: 3 }}>
          <Card className="jawn" bg="dark" text="white">
            <Card.Text>Credits: {this.state.credits}</Card.Text>
            <Card.Text>Betting Ticket</Card.Text>
            <Card.Body>
              <Card.Title>{this.state.currentBid.teamOneName} vs {this.state.currentBid.teamTwoName}</Card.Title>

              <Card.Text>
                Time: {moment(new Date(parseInt(this.state.currentBid.commencementTime * 1000))).format('MMMM Do YYYY, h:mm a')}
              </Card.Text>
              
              <Form.Label>Bid Amount</Form.Label>
              <Form.Control
                type="awayBidAmount"
                placeholder="$0"
                id="awayBidAmount"
                name="awayBidAmount"
                value={this.state.bidAmount}
                onChange={this.handleChange} />
              <Button onClick={this.handleSubmit} variant="warning" type="submit">
                Submit Away Bet
  						</Button>
              <Form.Control
                type="homeBidAmount"
                placeholder="$0"
                id="homeBidAmount"
                name="homeBidAmount"
                value={this.state.bidAmount}
                onChange={this.handleChange} />
              <Button onClick={this.handleSubmit} variant="warning" type="submit">
                Submit Home Bet
  						</Button>
              

            </Card.Body>
          </Card>
        </Col>
      );
    };
  };
};
export default GamePage;