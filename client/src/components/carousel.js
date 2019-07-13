import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import one from "../assets/1.jpg";
import two from "../assets/2.JPG";
import three from "../assets/3.jpg";
import four from "../assets/4.jpg";
import five from "../assets/5.jpg";
import six from "../assets/6.jpg";
import seven from "../assets/7.jpg";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner"


class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      articles: [],
      isLoaded: false
    };
  }
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
          })
        }
      )

  };
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { index, direction, articles, isLoaded } = this.state;
    if (!isLoaded) {
      return <Spinner animation="grow" variant="warning" />
    } else {
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
       
          <Carousel.Item>
              <img
                className="d-block w-100"
                src={one}
                caption="1"
                alt="pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={two}
                caption="2"
                alt="pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={three}
                caption="3"
                alt="pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={four}
                caption="4"
                alt="pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={five}
                caption="5"
                alt="pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={six}
                caption="6"
                alt="pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={seven}
                caption="7"
                alt="pic"
              />
            </Carousel.Item>

        </Carousel>
      );
    }
  }
}

export default ControlledCarousel