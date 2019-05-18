/* App Component
- entry point
- contains logbook, stats and menu
- probably doesn't need to connect to the global store
*/

// React and Hooks
import React, { useState } from "react";

// Styles
import { BaseStyle, HeaderStyle } from "../styles/mainView";

// Data
import climbData from "../data/mb-logbook.json";
import { formatData } from "../utils/formatData";
const allLogs = formatData(climbData); // load all logs, or just an initial portion?

// Components
import Stats from "./Stats";
import { Logbook } from "./Logbook";

export default function App() {
  // handle view loading
  // - refactor into a custom hook perhaps - see Logbook.jsx
  const [view, setView] = useState("Stats");

  // should this be useEffect? - e.target is a dom thing
  function handleViewChange(e) {
    setView(e.target.textContent);
  }

  return (
    <BaseStyle>
      <HeaderStyle>
        <button onClick={handleViewChange} className={view === "Stats" ? "active" : ""}>
          <span>Stats</span>
        </button>
        <button onClick={handleViewChange} className={view === "Logbook" ? "active" : ""}>
          <span>Logbook</span>
        </button>
      </HeaderStyle>
      {view === "Stats" && <Stats />}
      {view === "Logbook" && <Logbook logs={allLogs} />}
    </BaseStyle>
  );
}
