import React, { Component } from "react";
import barclay from "../assets/barclay.png"
import manchester from "../assets/manchester.png"
import supercontest from "../assets/supercontest.jpg"

var axios = require("axios");
class Home extends Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   Axios.get("/api/scrape");
  // }

  render() {
    return (
      <div className="logoBackground">
        <img src={barclay} alt="" /> 

        <div className="homepage">
          <img src={manchester} alt="" />
      </div>
      <div className="sport">
        <img src={supercontest} alt="background" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Sports Betting With Points {" "}
        </a>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="login-form.js">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.premierleague.com/fixtures">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.premierleague.com/fixtures">
                Pricing
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="https://en.wikipedia.org/wiki/List_of_Premier_League_clubs"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                  

              </div>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}

export default Home;
