const axios = require ("axios");
require("dotenv").config();

module.exports = { 
    oddsRequest: function (sport) {
        const api_key = "68167223b9315fb382f106b4e105f92e"
        let queryURL = `https://api.the-odds-api.com/v3/odds?sport=` + sport + `&region=us&mkt=h2h&apiKey=` + api_key;
        
        axios.get(queryURL).then(function(response){
            for (let i = 0; i < response.data.data.length; i++){
                const odds = response.data
                oddsData = [
                    "League: " + odds.data[i].sport_nice,
                    odds.data[i].teams[0] + "vs" + odds.data[i].teams[1],
                    odds.data[i].home_team + "At Home",
                    "Starts At: " + odds.data[i].commence_time,
                    "Odds: " + odds.data[i].sites[0].odds.h2h[0] + ": 1",
                    "Over/Under: " + odds.data[i].sites[0].odds.h2h[2]
                ];
                console.log(oddsData)
            }
        })
    }
}

oddsRequest("soccer_epl", "uk");