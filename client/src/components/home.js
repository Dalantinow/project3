import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import ControlledCarousel from './carousel';
import Axios from "axios";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Spinner from "react-bootstrap/Spinner";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      articles: [],
      league: ""
    };
  };
 
  componentDidMount() {
    Axios.get("http://localhost:3001/scrape")

    .then((result) => {
      this.setState({
        isLoaded: true,
        articles: result.data
      });

    },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }
  onClickHandler = event => {
    const league = event.target.innerHTML;
    this.setState({ league })
    let oddsApiCall = (sport) => {
      fetch("https://api.the-odds-api.com/v3/odds?sport=" + sport + "&region=us&mkt=h2h&apiKey=0cf960a0668ac664d33731f63e58304d")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.data);
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
    const { error, isLoaded, items, articles } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Spinner animation="grow" variant="warning" />
    } else {
      return (
        <div>
          <Container>
            <ControlledCarousel className="carousel" />
            <Row>

              <Col className="col-1" sm>
                <Card bg="dark" text="white">
                  <Card.Body>
                    <ButtonToolbar>
                      <MDBDropdown className="MBDDropdown">
                        <MDBDropdownToggle id ="upcoming-games"className="home-button" caret color="warning">
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
                <div> {items.map(item => (
                  <Card className="jawn" bg="dark" text="white">
                    <Card.Body>
                      <Card.Title>{item.teams[0]} vs {item.teams[1]}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.home_team} at Home</Card.Subtitle>
                      <Card.Text>
                        League: {item.sport_nice}
                      </Card.Text>
                      <Card.Text>
                        Time: {moment(new Date(parseInt(item.commence_time * 1000))).format('MMMM Do YYYY, h:mm a')}
                      </Card.Text>
                      <Card.Subtitle>Bet On:  </Card.Subtitle>
                      <ButtonToolbar>
                        <Button className="home-button" href="#" variant="warning">{item.teams[0]}</Button>
                        <Button className="home-button" href="#" variant="warning">{item.teams[1]}</Button>
                      </ButtonToolbar>

                    </Card.Body>
                  </Card>
                ))}
                </div>
              </Col>
              <Col className="col-2" sm>
                <Card bg="dark" text="white">
                  <Card.Body>
                  {/*<ButtonToolbar>
                       <MDBDropdown className="MBDDropdown">
                        <MDBDropdownToggle id ="upcoming-games" className="home-button" caret color="warning">
                          Upcoming Games
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                          <MDBDropdownItem active={this.state.scrape === "cfb"} onClick={this.scrapingCall(this)}>College Football (NCAAF)</MDBDropdownItem>
                          <MDBDropdownItem active={this.state.scrape === "nfl"} onClick={this.scrapingCall(this)}>NFL</MDBDropdownItem>
                          <MDBDropdownItem active={this.state.scrape === "mlb"} onClick={this.scrapingCall(this)}>MLB</MDBDropdownItem>
                          <MDBDropdownItem active={this.state.scrape === "mma"} onClick={this.scrapingCall(this)}>MMA</MDBDropdownItem>
                          <MDBDropdownItem active={this.state.scrape === "mls"} onClick={this.scrapingCall(this)}>MLS</MDBDropdownItem>
                          <MDBDropdownItem active={this.state.scrape === "nba"} onClick={this.scrapingCall(this)}>NBA</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </ButtonToolbar> */}
                    {/* Eventually want to change the params of the news scraper to fill requests for leagues */}
                  <Card.Title>News</Card.Title>
                  </Card.Body>
                </Card>
                <br></br>
                <div> {articles.map(article => (
                  <Card className="jawn" bg="dark" text="white">
                    <Card.Body>
                      <img src={article.thumbnail} alt="thumbnail"></img>
                      <Card.Text>{article.title}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Button className="home-button" variant="warning" href={article.link}>Go</Button>
                    </Card.Body>
                  </Card>
                ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div >
      )
    };
  };
 };
export default Home;

