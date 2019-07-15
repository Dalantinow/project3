import React from "react";
import Axios from "axios";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from 'react-bootstrap/Button';
import { BrowserRouter } from 'react-router-dom';


class BidButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onClickHandler = event => {
        const data = {
            id: this.props.id,
            home: this.props.home,
            away: this.props.away,
            time: this.props.time
        }
        
        Axios.post('http://localhost:3001/bid', data)
        .then(res => {
            window.location.href = '/bid/' + res.data._id
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    render() {
      
        return (
            <>
                <ButtonToolbar>
                    <Button className="awayhome"  variant="warning" onClick={this.onClickHandler}>Away</Button>
                    <Button className="awayhome" variant="warning" onClick={this.onClickHandler}>Home</Button>
                </ButtonToolbar>
            </>
        );
    };
};
export default BidButtons;