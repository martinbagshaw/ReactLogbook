import React, { FC } from "react";
import styled from "styled-components";

import { LogType, LogbookType } from "../../utils/types";

import { colors, breakpoint } from "../common/styleVariables";
import { buttonBase } from "../common/Buttons";
import UpdateButton from "./UpdateButton";
import { iconFunc } from "../common/icons/iconFunc";

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

const ButtonContainer = styled.div`
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

const getText = (item: keyof LogType, props: Props) => {
  if (item === "date") {
    const { dayLong, monthLong, year } = props[item];
    return {
      jsx: <strong>{`${dayLong} ${monthLong} ${year}`}</strong>,
      raw: `${dayLong} ${monthLong} ${year}`,
    };
  } else {
    return { raw: props[item] };
  }
};

interface Props extends LogType {
  handleSingleView: (index: string | null) => void;
}
const SingleLog: FC<Props> = props => {
  const { climbName, handleSingleView, notes } = props;

  const logDetails: Array<LogbookType> = ["grade", "cragName", "style", "date", "partners"];

  return (
    <Container>
      <BackButton onClick={() => handleSingleView(null)}>
        {iconFunc("chevron", { fill: "unset", title: "back", direction: "left" })}
        <span>back</span>
      </BackButton>
      <Content>
        <Title>{climbName}</Title>
        <LogList>
          {logDetails.map(item => {
            const { jsx, raw } = getText(item, props);
            return (
              <ListItem key={item}>
                {iconFunc(item, { title: raw })}
                {jsx || raw}
              </ListItem>
            );
          })}
          {notes && (
            <ListItem>
              {iconFunc("comment")}
              {notes}
            </ListItem>
          )}
        </LogList>
      </Content>
      <ButtonContainer>
        <UpdateButton icon="star" title="star this ascent" />
        <UpdateButton icon="notes" title="add notes to this ascent" />
      </ButtonContainer>
    </Container>
  );
};

export default SingleLog;
