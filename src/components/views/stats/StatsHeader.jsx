import React from "react";
import styled from "styled-components";
import { breakpoint, colors } from "../../common/styleVars";

const Header = styled.header`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  margin-right: 1rem;
  padding-bottom: 0.25rem;
  border-bottom: 0.125rem solid ${colors.black};
  font-size: 1rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.25rem;
  }
`;

const MainControl = styled.div`
  display: flex;
  border-left: 1px solid ${colors.black};
  padding-left: 1rem;
  margin-left: 1rem;
  select {
    margin-left: 0.5rem;
  }
`;

const H2 = styled.h2`
  margin-right: 2rem;
  strong {
    font-weight: 700;
  }
  font-size: 1rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.25rem;
  }
`;

const FilterControl = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
`;

const Controls = styled.div`
  display: flex;
`;

const StatsHeader = ({ logs, setDropdown, type }) => (
  <Header>
    <Top>
      <H1>
        Total Logs: <strong>{logs.length}</strong>
      </H1>
      <MainControl>
        <p>Stats by:</p>
        <select onChange={e => setDropdown("type", e.target.value)}>
          <option>Date</option>
          <option>Discipline</option>
          <option>Style</option>
          <option>Partner(s)</option>
        </select>
      </MainControl>
    </Top>
    <FilterControl>
      <H2>
        Filter <strong>{type}</strong>
      </H2>
      <Controls>
        <select onChange={e => setDropdown("date", e.target.value)}>
          <option>Year</option>
          <option>Month</option>
        </select>
      </Controls>
    </FilterControl>
  </Header>
);

export default StatsHeader;
