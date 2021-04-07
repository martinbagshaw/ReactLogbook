import React, { FC } from "react";
import styled from "styled-components";
import Select, { StylesConfig, ValueType } from "react-select";

import { CategoryInt, SettingsInt, SettingsType, LogType } from "../../utils/types";
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
  font-size: 1rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.25rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 0.75rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.25rem;
    margin-right: 1rem;
  }
`;

const FilterControl = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  font-size: 1rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.25rem;
  }
`;

const Controls = styled.div`
  display: flex;
`;

const customStyles: StylesConfig = {
  control: (provided, state) => {
    const {
      isFocused,
      selectProps: { width },
    } = state;
    const color = colors[isFocused ? "red" : "midGrey"];
    const backgroundColor = colors[isFocused ? "lightRed" : "white"];
    return {
      ...provided,
      width: width || 140,
      backgroundColor,
      borderColor: color,
      boxShadow: `0 0 1px ${color}`,
      cursor: "pointer",
      display: "flex",
    };
  },
  indicatorSeparator: () => ({
    borderColor: colors.midGrey,
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
  { value: "year", label: "All Years" },
  { value: "month", label: "Combined Months" },
];

type StatsHeaderProps = {
  logs: LogType[];
  type: SettingsType;
  setDropdown: (type: keyof SettingsInt, item: ValueType<CategoryInt>) => void;
};
const StatsHeader: FC<StatsHeaderProps> = ({ logs, setDropdown, type }): JSX.Element => (
  <Header>
    <Categories>
      <H1>
        Total Logs: <strong>{logs.length}</strong>
      </H1>
      <CategoriesControl>
        <Label htmlFor="categories-control">Stats by:</Label>
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
        />
      </CategoriesControl>
    </Categories>
    <FilterControl>
      <Label htmlFor={`${type}-control`}>Filtering by:</Label>
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
          width={220}
        />
      </Controls>
    </FilterControl>
  </Header>
);

export default StatsHeader;
