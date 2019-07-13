import React from "react";
import Axios from "axios";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from 'react-bootstrap/Button';



class BidButtons extends React.Component {
    constructor(props) {
      super(props);
      this.state= { 
        bids: []
      }
    }

onClickHandler = event => {
    Axios.get("http://localhost:3001/bid/" + this.state.bids.gameId)

    .then((result) => {
      this.setState({
        isLoaded: true,
        bids: result.data
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
    return ( 
        <>
    <ButtonToolbar>
    <Button className="awayhome" href={"/bid/" + this.state.bids.gameId} variant="warning">Away</Button>
    <Button className="awayhome" href={"/bid/" + this.state.bids.gameId}variant="warning">Home</Button>
  </ButtonToolbar>
  </>
    )
}
}
export default BidButtons