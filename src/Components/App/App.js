import React from "react";
// styles
import { AppContainer } from "../styles/mainView";

// import data
import climbData from "../../data/mb-logbook.json";
// import { climbData } from "../../data/getData"; // API version

// import and combine all components here
import Search from "../Search/Search";
import Nav from "../Nav/Nav";
import SearchList from "../SearchList/SearchList";
import LargeResult from "../LargeResult/LargeResult";

class App extends React.Component {
  state = {
    climbs: [],
    matchingClimbs: [],
    matchingResult: "",
    favouriteClimbs: [],
    memorableClimbs: [],
    active: "back", // keep track of list or item to show / toggle
  };

  componentDidMount() {
    // change format of data
    const newData = climbData.map(item => {
      return {
        climbName: item["Climb name"],
        cragName: item["Crag name"],
        date: item.Date,
        grade: item.Grade,
        notes: item.Notes,
        partners: item["Partner(s)"],
        style: item.Style,
      };
    });

    this.setState({ climbs: newData });
    // climbData().then(data => {
    //   this.setState({ climbs: data });
    // });
  }

  // push an array of matching climbs to state
  searchClimbs = e => {
    if (this.state.climbs.length > 0) {
      const matchArray = this.findMatches(e.target.value, this.state.climbs);
      this.setState({ matchingClimbs: matchArray });
    }
  };

  // find matching climbs function
  findMatches = (wordToMatch, climbs) => {
    return climbs.filter(entry => {
      const regex = new RegExp(wordToMatch, "gi");
      // climb name or crag name
      const climb = entry.climbName.toString();
      const crag = entry.cragName.toString();
      return climb.match(regex) || crag.match(regex);
    });
  };

  // show single log
  showLog = matchingResult => {
    this.setState({ matchingResult });
  };

  // toggle lists
  toggleList = activeList => {
    this.setState({ active: activeList });
  };

  // show favourites
  // show memorable

  render() {
    return (
      <AppContainer>
        <Search onChange={this.searchClimbs} />
        <Nav onClick={this.toggleList} active={this.state.active} />
        <LargeResult resultData={this.state.matchingResult} />
        <SearchList matchingClimbs={this.state.matchingClimbs} onClick={this.showLog} />
      </AppContainer>
    );
  }
}

export default App;
