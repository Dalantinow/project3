import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  };


  componentDidMount() {
    var apiKey = process.env.apiKey;
    fetch("https://api.the-odds-api.com/v3/odds?sport=soccer_epl&region=uk&mkt=h2h&apiKey=71bb5796ac3d48b345d68c07d65c5bbb")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }

      );
    console.log("j")
  };


  render() {

    let imgUrl = '../images/smoke.jpg';
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Games...</div>;
    } else {
      return (
        <div>
          <div className='Component-Bg'
            style={{
              backgroundImage: 'url(' + imgUrl + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}>
          </div>
          <Container>
            <Row>
              <Col sm>
                <Card bg="dark" text="white">
                <Card.Body>
                <Card.Title>Upcoming Games</Card.Title>
                </Card.Body>
                </Card>
                <br></br>
                <div> {items.map(item => (
                  <Card bg="dark" text="white">
                    <Card.Body>
                      <Card.Title>{item.teams[0]} vs {item.teams[1]}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.home_team} at Home</Card.Subtitle>
                      <Card.Text>
                        League: {item.sport_nice}
                      </Card.Text>
                      <Card.Text>
                        Time: {(item.commence_time)}
                      </Card.Text>
                      <Card.Subtitle>Bet On:  </Card.Subtitle>
                      <Button href="#" variant="outline-dark">{item.teams[0]}</Button>
                      <Button href="#" variant="outline-dark">{item.teams[1]}</Button>
                    </Card.Body>
                  </Card>
                ))}

                </div>
              </Col>
              <Col sm>
              <Card bg="dark" text="white">
                <Card.Body>
                <Card.Title>Sports News</Card.Title>
                </Card.Body>
                 
                </Card>
                <br></br>
                <div className="articles"></div>
                <Card bg="dark" text="white">
                  <Card.Body>
                    <Card.Title>AHHHH</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
    };
  };
};


export default Home;
