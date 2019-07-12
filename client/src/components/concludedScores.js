import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import moment from 'moment';

class ConcludedScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    };


    componentDidMount() {
        // var apiToken = process.env.apiToken;
        fetch('https://api.football-data.org/v2/competitions/CL/matches?season=2019&status=FINISHED', {
            headers: {'X-Auth-Token': '321b9e5504f34bfca96830247c9ff485'}
        })
        .then(response => response.json())
            .then((result) => {
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

        } else { 
            return (
                <div>
                    <Container>
                        <Row>

                            <Col sm>
                                <Card bg="dark" text="white">
                                    <Card.Body>
                                        <Card.Title>Concluded</Card.Title>
                                    </Card.Body>
                                </Card>
                                <br></br>
                                <div> {items.matches.map(item => (
                                    <Card bg="dark" text="white">
                                        <Card.Body>
                                            <Card.Title>{item.awayTeam.name} at {item.homeTeam.name}</Card.Title>
                                            <Card.Text>
                                                {item.score.fullTime.awayTeam}     {item.score.fullTime.homeTeam}
                                            </Card.Text>
                                            <Card.Text>
                                                Winner: {item.score.winner}
                                            </Card.Text>
                                            <Card.Text>
                                                Time (EST): {moment(item.utcDate).format('MMMM Do YYYY')}
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

export default ConcludedScores;