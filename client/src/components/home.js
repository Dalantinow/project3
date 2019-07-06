import React, { Component } from "react";
import barclay from "../assets/barclay.png"

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

        <nav class="subNav" role="menubar">
            <ul class="showMoreEnabled">
                        <li data-nav-index="0"><a href="/" class="  active" data-link-index="0" role="menuitem">Home</a></li>
                        <li data-nav-index="1"><a href="/fixtures" class="  " data-link-index="1" role="menuitem">Fixtures</a></li>
                        <li data-nav-index="2"><a href="/results" class="  " data-link-index="2" role="menuitem">Results</a></li>
                        <li data-nav-index="3"><a href="/tables" class="  " data-link-index="3" role="menuitem">Tables</a></li>
                        <li data-nav-index="4"><a href="/transfers/summer/2019" class="  " data-link-index="4" role="menuitem">Transfers</a></li>
                        <li data-nav-index="5"><a href="/broadcast-schedules" class="  " data-link-index="5" role="menuitem">Broadcast</a></li>
                        <li data-nav-index="6"><a href="/tickets" class="  " data-link-index="6" role="menuitem">Tickets</a></li>
                        <li data-nav-index="7"><a href="/clubs" class="  " data-link-index="7" role="menuitem">Clubs</a></li>
                        <li data-nav-index="8"><a href="/players" class="  " data-link-index="8" role="menuitem">Players</a></li>
                        <li data-nav-index="9"><a href="/managers" class="  " data-link-index="9" role="menuitem">Managers</a></li>
                        <li data-nav-index="10"><a href="/news" class="  " data-link-index="10" role="menuitem">News</a></li>
                        <li data-nav-index="11"><a href="/social" class="  " data-link-index="11" role="menuitem">Social</a></li>
                        <li data-nav-index="12"><a href="/youth" class="  " data-link-index="12" role="menuitem">Youth</a></li>
                        <li data-nav-index="13" class="hide"><a href="/safeguarding" class="  " data-link-index="13" role="menuitem">Safeguarding</a></li>
                        <li data-nav-index="14" class="hide"><a href="/history" class="  " data-link-index="14" role="menuitem">History</a></li>
                        <li data-nav-index="15" class="hide"><a href="/referees/overview" class="  " data-link-index="15" role="menuitem">Referees</a></li>
            <li class="more"><div class="moreToggle" tabindex="0">More<span class="icn chevron-down"></span></div><ul class="moreToggleDropdown"><li data-nav-index="13"><a href="/safeguarding" class="  " data-link-index="13" role="menuitem">Safeguarding</a></li><li data-nav-index="14"><a href="/history" class="  " data-link-index="14" role="menuitem">History</a></li><li data-nav-index="15"><a href="/referees/overview" class="  " data-link-index="15" role="menuitem">Referees</a></li></ul></li></ul>
        </nav>


      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Sports Betting {" "}
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
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
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
