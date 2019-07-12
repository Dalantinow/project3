import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';



class LiveScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    };


    componentDidMount() {
        // var apiLiveKey = process.env.apiLiveKey;
        // var apiLiveSecret = process.env.apiLiveSecret;
        axios.get('https://livescore-api.com/api-client/scores/live.json?key=TsfFi64sOfpsBBjp&secret=fudIJKjCR8PAQChK5wpnDuPsJfVlQeK6',{
            method: "GET",
            mode: "no-cors",
            headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json'
            }
        })
        .then(response => response.json())
            .then((result) => {
                console.log(result)
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
            
    };


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading Games...</div>;
        } else if (!items) {
            return <div>Sorry... No Games Right Now</div>;
        } else { 
            return (
                <div>
                    <Container>
                        <Row>

                            <Col sm>
                                <Card bg="dark" text="white">
                                    <Card.Body>
                                        <Card.Title>Live</Card.Title>
                                    </Card.Body>
                                </Card>
                                <br></br>
                                <div> {items.data.match.map(item => (
                                    <Card bg="dark" text="white">
                                        <Card.Body>
                                            <Card.Title>{item.away_name} at {item.home_name}</Card.Title>
                                            <Card.Text>
                                               Game Status: {item.status}
                                            </Card.Text>
                                            
                                            <Card.Text>
                                                Score: {item.score}
                                            </Card.Text>

                                            <Card.Text>
                                                Time: {item.time}
                                            </Card.Text>
                                            
                                        </Card.Body>
                                    </Card>
                                ))}
                                    <br></br>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        };
    };
};

export default LiveScores;