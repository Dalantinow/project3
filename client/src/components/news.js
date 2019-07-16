import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      error: null,
      isLoaded: false,
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

  render() {
    const { articles, error, isLoaded } = this.state;
    // const loggedIn = this.props.loggedIn;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <Spinner animation="grow" variant="warning" />
    // } else if (loggedIn === true) {
      return (
        <Container>
          <Col sm>
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
                  <Button className="home-button" variant="warning" href={article.link}>Go</Button>
                </Card.Body>
              </Card>
            ))}
            </div>
          </Col>
        </Container>
      );
    // };
  };
};
export default News;