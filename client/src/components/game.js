import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Axios from "axios";
import Col from "react-bootstrap/Col";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Spinner from "react-bootstrap/Spinner";

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bid: {},
            isLoaded: false
        }
    }
    componentDidMount() {
        Axios.get("http://localhost:3001/bid")
        .then((result) => {
          this.setState({
            isLoaded: true,
            bid: result.data
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
        
        const {bid, isLoaded} = this.state;
        console.log(bid)
        if (!isLoaded) {
            return <Spinner animation="grow" variant="warning" />
          } else {
            return (
            <Col md={{ span: 6, offset: 3 }}>
            <Card className="jawn" bg="dark" text="white">
                <Card.Text>Betting Ticket</Card.Text>
                <Card.Body>
      <Card.Title>{bid.teamOneName} vs {bid.teamTwoName}</Card.Title>
      
      <Card.Text>
        Time: {moment(new Date(parseInt(bid.commencementTime * 1000))).format('MMMM Do YYYY, h:mm a')}
      </Card.Text>
      <ButtonToolbar className="buttonbar">
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
    <Button className="bidbutton" variant="warning" value="#"></Button>
        </ButtonToolbar>
    </Card.Body>
            </Card>
            </Col>
        );
    };
};
};
export default GamePage;