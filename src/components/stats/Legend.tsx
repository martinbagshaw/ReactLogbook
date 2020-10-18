import React, { Fragment, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import useIsWidth from "../common/useIsWidth.jsx";
import { buttonBase } from "../common/Buttons.jsx";
import { Chevron } from "../common/icons/Icons.jsx";
import { breakpoint, colors } from "../common/styleVars";

const Container = styled.div`
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background: ${colors.lightGrey};
  border-top: 0.175rem solid ${colors.midGrey};
  @media only screen and (min-width: ${breakpoint.tablet}) {
    position: unset;
    width: auto;
    background: transparent;
    border-top: 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LegendTitle = styled.legend`
  font-weight: 500;
`;

const Button = styled.button`
  ${buttonBase};
  width: 100%;
  text-align: right;
  svg {
    fill: ${colors.black};
    transition: all ease-in-out 0.3s;
    margin-right: 0.25rem;
    width: 2.25rem;
    height: 2.25rem;
    @media only screen and (min-width: ${breakpoint.Xsmall}) {
      width: 3rem;
      height: 3rem;
    }
  }
  &:hover svg {
    margin-left: 0.5rem;
  }
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: none;
    pointer-events: none;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  strong {
    font-weight: 700;
    margin-right: 0.5rem;
  }
`;

interface SquareProps {
  bg: string;
};

const Square = styled.div<SquareProps>`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  background-color: ${({ bg }) => bg};
`;

const chartColors = d3.scaleOrdinal(d3.schemeCategory10);

// redo, and re- evaluate this
// - may be better to introduce TypeScript top-down
type LegendComponent<Props> =
  (props: Props) => LegendComponent<any> | null | JSX.Element

// interfaces
interface Data {
  readonly itemFilter: string;
  keyLabel: ReadonlyArray<[number, number]>;
  readonly tooltipLabel: string;
  readonly value: number;
};

// describes one object in an array
interface ChartItem {
  data: {
    [key: string]: Data;
  };
  // not causing errors, as none of this is used here (probably):
  readonly endAngle: number;
  readonly index: number;
  readonly padAngle: number;
  readonly startAngle: number;
  readonly value: number; // changing to string from number does not help / break anything
};

// try using types instead of interfaces (probably)
// https://github.com/typescript-cheatsheets/react#types-or-interfaces

// interface NameOfYourMap<T> {
//   [index: string]: T;
//   [index: number]: T;
// } 

// T is the type passed in when declaring it like
// const bananas: NameOfYourMap<BananaObject> = 'bananas';

// So the T is then BananaObject and the banana object can have string or number as keys.

// type SettingsKeys = 'date' | 'discipline' | 'grade' | 'partners' | 'style' | 'type';

// https://stackoverflow.com/questions/39256682/interface-for-dynamic-key-in-typescript
// const settings: Record<SettingsKeys, object> = { ... }
// [key: string]: Object[]
// [index: string]: T;

// https://www.typescriptlang.org/docs/handbook/generics.html

// example of generics:
// function identity<T>(arg: T): T {
//   return arg;
// }

// T describes the input and output type
// - here, the input and output types must be the same
// - above example will work over a range of types


// explicitly set the type:
// let output = identity<string>("myString");

// infer the type:
// let output = identity("myString");


// example with an array as an input and output:
// function loggingIdentity<T>(arg: T[]): T[] {
//   console.log(arg.length);
//   return arg;
// }

interface Settings {
  date: {
    [key: string]: Date;
  };
  discipline: {
    [key: string]: object;
  };
  grade: {
    [key: string]: object;
  };
  partners: {
    [key: string]: object;
  };
  style: {
    [key: string]: object;
  };
  type: string;// keyof Date  this value is a key of Settings (date)- but to lowercase
}

interface Date {
  cumulative: string; //keyof Settings
}

interface Props {
  chartdata: ReadonlyArray<ChartItem>;
  settings: Settings;
}

// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const Legend: LegendComponent<Props> = ({ chartdata, settings }) => {
  const [open, setOpen] = useState(false);
  const { isWidth: isTablet } = useIsWidth("tablet");

  const { type } = settings as Settings<Object>;
  // https://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type
  // const key: (keyof Date) = type.toLowerCase();
  const key = type.toLowerCase();
  // set so I can only use property names that exist on settings
  const { cumulative } = settings[key];

  // settings.type is a string
  // this is also a key of settings object, after it has been converted to lowercase
  // value of type property is the key value of other properties on the same object

  return (
    <Container>
      <TitleContainer>
        <LegendTitle>Key{cumulative === "Month" && ": All years"}</LegendTitle>
        <Button onClick={() => setOpen(!open)}>
          <Chevron
            title={`${open ? "close" : "open"} key`}
            fill="unset"
            direction={open ? "down" : "up"}
          />
        </Button>
      </TitleContainer>

      {(isTablet || open) && (
        <Items>
          {chartdata.map((d, i: number) => (
            <Item key={i}>
              <Square bg={chartColors(i.toString())} />
              {d.data && d.data.keyLabel ? 
              (
                <Fragment>
                  <strong>{d.data.keyLabel[0]}</strong>
                  {`${d.data.keyLabel[1]}`}
                </Fragment>
              ): "no label found"}
            </Item>
          ))}
        </Items>
      )}
    </Container>
  );
};

export default Legend;
