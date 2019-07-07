import React, { Component } from "react";

// 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
      fetch("https://api.the-odds-api.com/v3/odds?sport=soccer_epl&region=uk&mkt=h2h&apiKey=68167223b9315fb382f106b4e105f92e")
      .then(res => res.json())
      
      .then(
        (result) => {
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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>{items.map(item => (
          
            <li>
              <p>{item.teams[0]} vs {item.teams[1]}</p>
              <p>Home Team: {item.home_team}</p>
              <p>Gametime: {Date(item.commence_time)}</p>
              <p>League: {item.sport_nice}</p>
              <p>Odds: {item.sites[0].odds.h2h[0]}</p>

            </li>
          ))}
        </ul>
      );
    }
  }
}
export default Home;
