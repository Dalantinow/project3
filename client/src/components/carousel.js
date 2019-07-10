import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";
import four from "../assets/4.jpg";
import five from "../assets/5.jpg";
import six from "../assets/6.jpg";
import seven from "../assets/7.jpg";


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
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src={barclay}
              alt="First slide"
            />
            <Carousel.Caption>
    
            </Carousel.Caption>
          </Carousel.Item> */}
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src={liverpool}
              alt="Third slide"
            />
  
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item> */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={one}
              alt="slide one"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={two}
              alt="slide two"
            />
            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={three}
              alt="slide three"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={four}
              alt="slide four"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={five}
              alt="slide five"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={six}
              alt="slide six"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={seven}
              alt="slide seven"
            />
          </Carousel.Item>
        
       
        </Carousel>
      );
    }
  }
  
  export default ControlledCarousel