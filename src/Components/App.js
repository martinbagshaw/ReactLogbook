/* App Component
- entry point, contains main nav and main view
*/

// React and Hooks
import React, { useState } from "react";

// Styles
import { BaseStyle, HeaderStyle } from "../styles/mainView";

// Data - from file
import climbData from "../data/mb-logbook.json";
import { formatData } from "../utils/formatData";
const allLogs = formatData(climbData);

// Components
import Stats from "./Stats";
import { Logbook } from "./Logbook";

export default function App() {
  // handle view loading
  const [view, setView] = useState("Stats");

  // should this be useEffect? - e.target is a dom thing
  function handleViewChange(e) {
    setView(e.target.textContent);
  }

  return (
    <BaseStyle>
      <HeaderStyle>
        <div>
          <button onClick={handleViewChange}>Stats</button>
          <button onClick={handleViewChange}>Logbook</button>
        </div>
      </HeaderStyle>
      {view === "Stats" && <Stats />}
      {view === "Logbook" && <Logbook logs={allLogs} />}
    </BaseStyle>
  );
}
