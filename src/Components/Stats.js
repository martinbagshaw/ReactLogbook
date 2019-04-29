import React, { useState } from "react";

// Styles
import { ContainerStyle } from "../styles/mainView";

export default function Stats(props) {
  return (
    <ContainerStyle>
      <section>
        Stats by:{" "}
        <select>
          <option>Date</option>
          <option>Grade</option>
        </select>
      </section>
      <section>This is stats</section>
    </ContainerStyle>
  );
}
