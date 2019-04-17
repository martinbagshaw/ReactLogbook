import React from "react";
// styles
import { AppContainer } from "../styles/mainView";

// import data (from file)
import climbData from "../../data/mb-logbook.json";
import { formatData } from "../../utils/formatData";
const allClimbs = formatData(climbData);
// import { climbData } from "../../data/getData"; // API version

// import and combine all components here
import Search from "../Search/Search";
import Nav from "../Nav/Nav";
import SearchList from "../SearchList/SearchList";
import LargeResult from "../LargeResult/LargeResult";

class App extends React.Component {
  state = {
    matchingClimbs: [],
    matchingResult: "",
    favouriteClimbs: [],
    memorableClimbs: [],
    active: "back", // keep track of list or item to show / toggle
  };

  componentDidMount() {
    // don't need to add all climbs to state, just suggestions
    // api call would happen here, if there was one
  }

  // do some planning first
  // - although i want suggestions in state, I also want to add extra information to any climb entry
  // - LargeResult may be a class component with its own methods - onChange to take notes, for example
  // --- this will affect state higher up, perhaps?
  // - if unchecked as fav or mem, notes currently lost
  // - fav, mem, has notes, back to suggestions
  // - click item, show in searchbar, hide others, show more detailed single view
  // 1. make autosuggest one function
  // 2. simpler look of suggestions
  // 3. click behaviour

  // formidable thing:
  // - text input
  // handleOnChange = e => {
  //   const inputVal = e.target.value.toLowerCase();

  //   // convert cars to lowercase
  //   const cars = this.props.list.map(item => item.toLowerCase());
  //   // get suggestions from list
  //   const suggestions = cars.filter(car => car.startsWith(inputVal));
  //   // const boldSuggestions = cars.map(car => car.replace(inputVal, `<strong>${inputVal}</strong>`))

  //   this.setState({
  //     active: inputVal.length > 0,
  //     inputVal: e.target.value,
  //     suggestions,
  //   });
  // };

  // push an array of matching climbs to state
  searchClimbs = e => {
    if (allClimbs.length > 0) {
      const matchArray = this.findMatches(e.target.value, allClimbs);
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
