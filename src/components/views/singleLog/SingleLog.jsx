import React from "react";
import styled from "styled-components";

import {
  Chevron,
  Circle,
  Place,
  Style,
  Date,
  Partner,
  Comment,
} from "../../common/icons/Icons.jsx";
import { colors, breakpoint } from "../../common/styleVars";
import { buttonBase } from "../../common/Buttons.jsx";
import IconButton from "./IconButton.jsx";

const Container = styled.div`
  margin-top: -1rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.125rem;
  background-color: ${colors.lightGrey};
  @media only screen and (min-width: ${breakpoint.small}) {
    margin-top: 0;
    flex-direction: row;
    border: 0.125rem solid ${colors.midGrey};
    > button,
    > div {
      flex: 1;
    }
  }
`;

const BackButton = styled.button`
  ${buttonBase};
  line-height: 1;
  display: flex;
  align-items: center;
  color: ${colors.black};
  background-color: ${colors.white};
  padding: 0.5rem;
  svg {
    fill: ${colors.black};
    transition: all ease-in-out 0.3s;
    margin-right: 0.25rem;
  }
  &:hover svg {
    margin-left: 0.5rem;
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    justify-content: center;
    border-radius: 0.175rem;
    margin: -0.125rem;
    background-color: ${colors.midGrey};
    color: ${colors.darkGrey};
    &:focus,
    &:hover,
    &:active {
      background-color: ${colors.darkGrey};
      color: ${colors.white};
      svg {
        fill: ${colors.white};
        margin: 0;
      }
    }
    svg {
      fill: ${colors.darkGrey};
      margin: 0;
    }
    span {
      display: none;
    }
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 0.5rem 2rem;
  @media only screen and (min-width: ${breakpoint.small}) {
    flex: 8;
    height: auto;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.125rem solid ${colors.midGrey};
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.5rem;
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    font-size: 2rem;
    border-bottom: 0;
    text-align: left;
  }
`;

const LogList = styled.ul`
  margin-top: -0.5rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 1rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.25rem;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    align-items: flex-start;
  }
  svg {
    min-width: 2.25rem;
    margin-right: 1rem;
  }
  strong {
    font-weight: 500;
  }
`;

const EditButtons = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  @media only screen and (min-width: ${breakpoint.small}) {
    flex-direction: column;
    position: unset;
  }
`;

const iconFunc = (key, string) => {
  const icons = {
    cragName: <Place cragName={string} />,
    grade: <Circle grade={string} />,
    style: <Style style={string} />,
    partners: <Partner partners={string} />,
    date: <Date date={string} />,
  };
  return icons[key];
};

const textFunc = (key, data) => {
  if (key === "date") {
    const {
      processed: { dayLong, monthLong, year },
    } = data;
    return `${dayLong} ${monthLong} ${year}`;
  }
  return data;
};

// TODO:
// - onClick for star and notes / memorable buttons.
const SingleLog = props => {
  const { climbName, notes, handleSingleView } = props;
  return (
    <Container>
      <BackButton onClick={() => handleSingleView(null)}>
        <Chevron fill="unset" title="back to logs" direction="left" />
        <span>back</span>
      </BackButton>
      <Content>
        <Title>{climbName}</Title>
        <LogList>
          {["grade", "cragName", "style", "date", "partners"].map(i => {
            const string = textFunc(i, props[i]);
            return (
              <ListItem key={i}>
                {iconFunc(i, string)}
                {i === "date" ? <strong>{string}</strong> : string}
              </ListItem>
            );
          })}
          {notes && (
            <ListItem>
              <Comment />
              {notes}
            </ListItem>
          )}
        </LogList>
      </Content>
      <EditButtons>
        <IconButton type="star" title="star this ascent" />
        <IconButton type="notes" title="add notes to this ascent" />
      </EditButtons>
    </Container>
  );
};

export default SingleLog;
