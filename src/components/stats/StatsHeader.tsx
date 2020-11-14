import React, { FC } from "react";
import styled from "styled-components";
import Select, { StylesConfig, ValueType } from "react-select";

import { Category, DefaultSettings, OutputObject } from "../../utils/types";
import { breakpoint, colors } from "../common/styleVariables";

const Header = styled.header`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;
const Categories = styled.div`
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

const CategoriesControl = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${colors.black};
  padding-left: 1rem;
  margin-left: 1rem;
  label {
    margin-right: 1rem;
  }
`;

const FilterLabel = styled.label`
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
  align-items: center;
  width: 100%;
  margin: 1rem 0;
`;

const Controls = styled.div`
  display: flex;
`;

const customStyles: StylesConfig = {
  control: (provided, state) => {
    const { isFocused } = state;
    const color = colors[isFocused ? "red" : "midGrey"];
    const backgroundColor = colors[isFocused ? "lightRed" : "white"];
    return {
      ...provided,
      width: 140,
      backgroundColor,
      borderColor: color,
      boxShadow: `0 0 1px ${color}`,
      cursor: "pointer",
      display: "flex",
    };
  },
  indicatorSeparator: () => ({
    borderColor: colors.midGrey
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: colors[state.isSelected ? "midGrey" : "lightGrey"],
    color: colors.black,
    cursor: "pointer",
    padding: "5 10",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const categories = [
  { value: "date", label: "Date" },
  { value: "discipline", label: "Discipline" },
  { value: "style", label: "Style" },
  { value: "partners", label: "Partner(s)" },
];

const dates = [
  { value: "year", label: "Year" },
  { value: "month", label: "Month" },
];

type Props = {
  logs: OutputObject[];
  type: keyof DefaultSettings;
  setDropdown: (type: keyof DefaultSettings, item: ValueType<Category>) => void;
};
const StatsHeader: FC<Props> = ({ logs, setDropdown, type }): JSX.Element => (
  <Header>
    <Categories>
      <H1>
        Total Logs: <strong>{logs.length}</strong>
      </H1>
      <CategoriesControl>
        <label htmlFor="categories-control">Stats by:</label>
        <Select
          aria-label="Select by Category"
          defaultValue={categories[0]}
          id="categories-control"
          isClearable={false}
          isSearchable={false}
          onChange={item => setDropdown("type", item)}
          options={categories}
          placeholder="Select by Category"
          styles={customStyles}
          value={categories.find(i => i.value === type)}
          width="200px"
        />
      </CategoriesControl>
    </Categories>
    <FilterControl>
      <FilterLabel htmlFor={`${type}-control`}>
        Filter <strong>{type}</strong>
      </FilterLabel>
      <Controls>
        <Select
          aria-label={`Select by ${type}`}
          defaultValue={dates[0]}
          id={`${type}-control`}
          isClearable={false}
          isSearchable={false}
          onChange={item => setDropdown("date", item)}
          options={dates}
          placeholder={`Select by ${type}`}
          styles={customStyles}
          value={dates.find(i => i.value === type)}
          width="200px"
        />
      </Controls>
    </FilterControl>
  </Header>
);

export default StatsHeader;
