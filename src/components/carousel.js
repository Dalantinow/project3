import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import barclay from "../assets/barclay.png";
import manchester from "../assets/manchester.png";
import supercontest from "../assets/supercontest.jpg";
import tottenham from "../assets/tottenham.jpg";
import Carousel from 'react-bootstrap/Carousel'
class ControlledCarousel extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
  
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={manchester}
              alt="First slide"
            />
            <Carousel.Caption>
    
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={supercontest}
              alt="Third slide"
            />
  
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={tottenham}
              alt="Third slide"
            />
  
            <Carousel.Caption>
    
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
  }
  
  export default ControlledCarousel