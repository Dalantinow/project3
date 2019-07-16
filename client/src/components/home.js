import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import ControlledCarousel from './carousel';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import BidButtons from "../components/bid";

import dotenv from "dotenv";
dotenv.config();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      league: ""
    };
  };
  componentDidMount() {
    var apiKey = process.env.REACT_APP_apiKey
    console.log(apiKey);
    require("dotenv").config();
  }
  onClickHandler = event => {
    const league = event.target.innerHTML;
    this.setState({ league })
    let oddsApiCall = (sport) => {
      var apiKey = process.env.REACT_APP_apiKey;
      console.log(apiKey)
      // fetch("https://api.the-odds-api.com/v3/odds?sport=" + sport + "&region=us&mkt=h2h&apiKey=" + apiKey )
      fetch("https://api.the-odds-api.com/v3/odds?sport=" + sport + "&region=us&mkt=h2h&apiKey=0cf960a0668ac664d33731f63e58304d")
        .then(res =>
          res.json())
        .then(
          (result) => {
            this.setState({
              items: result.data,
              isLoaded: true
            });
          },
        );
    };
    switch (league) {
      case "NFL":
        oddsApiCall("americanfootball_nfl");
        break;
      case "College Football (NCAAF)":
        oddsApiCall("americanfootball_ncaaf");
        break;
      case "MMA":
        oddsApiCall("mma_mixed_martial_arts");
        break;
      case "MLS":
        oddsApiCall("soccer_usa_mls");
        break;
      case "MLB":
        oddsApiCall("baseball_mlb");
        break;
      default:
        console.log("something went horribly wrong...");
    };
  };
  render() {
    const { items } = this.state;
    const loggedIn = this.props.loggedIn;
    console.log(loggedIn)
    return (
      <div>
        <Container>
          <ControlledCarousel className="carousel" />
          <Row>

            <Col sm>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Text>Log in and choose a league to get started!</Card.Text>
                  <ButtonToolbar>
                    <MDBDropdown className="MBDDropdown">
                      <MDBDropdownToggle id="upcoming-games" className="home-button" caret color="warning">
                        Upcoming Games
                        </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        <MDBDropdownItem active={this.state.league === "americanfootball_ncaaf"} onClick={this.onClickHandler}>College Football (NCAAF)</MDBDropdownItem>
                        <MDBDropdownItem active={this.state.league === "americanfootball_nfl"} onClick={this.onClickHandler}>NFL</MDBDropdownItem>
                        <MDBDropdownItem active={this.state.league === "baseball_mlb"} onClick={this.onClickHandler}>MLB</MDBDropdownItem>
                        <MDBDropdownItem active={this.state.league === "mma_mixed_martial_arts"} onClick={this.onClickHandler}>MMA</MDBDropdownItem>
                        <MDBDropdownItem active={this.state.league === "soccer_usa_mls"} onClick={this.onClickHandler}>MLS</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </ButtonToolbar>
                </Card.Body>
              </Card>
              <br></br>
              <div> {items.map((item, index) => (
                <Card className="jawn" bg="dark" text="white">
                  <Card.Body>
                    <Card.Title className="teamone">{item.teams[0]}
                      {/* ({(item.sites[0].odds.h2h[0] !== undefined) ? item.sites[0].odds.h2h[0] : "No odds yet"}) */}
                    </Card.Title>
                    <Card.Title>VS</Card.Title>
                    <Card.Title className="teamtwo">{item.teams[1]}
                      {/* ({(item.sites[1].odds.h2h[1] !== undefined) ? item.sites[1].odds.h2h[1] : "No odds yet"}) */}

                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.home_team} at Home</Card.Subtitle>
                    <Card.Text>
                      League: {item.sport_nice}
                    </Card.Text>
                    <Card.Text className="time">
                      Time: {moment(new Date(parseInt(item.commence_time * 1000))).format('MMMM Do YYYY, h:mm a')}
                    </Card.Text>
                    <BidButtons id={index} away={item.teams[0]} home={item.teams[1]} time={item.commence_time} />

                  </Card.Body>
                </Card>
              ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div >
    );
  };
};
export default Home;

