import { cleanup } from "@testing-library/react";

import { getDateNew } from "./get-date-new";
import {
  bowles,
  fontanel,
  mackerel,
  mobyDick,
  paranoid,
  theMallard,
  thePocketTraverse,
} from "./test-data/test-data";

afterEach(cleanup);

describe("getDate (new) tests", () => {
  describe("invalid dates", () => {
    it("no values entered", () => {
      const res = getDateNew();
      expect(res).toEqual({ value: "none", label: "None found" });
    });
    it("date string does not apply", () => {
      const res = getDateNew("date/1");
      expect(res).toEqual({ value: "none", label: "None found" });
    });
    it("date string contains ???? for year", () => {
      const res = getDateNew("???/????");
      expect(res).toEqual({ value: "none", label: "None found" });
    });
    it("date string has more than two slashes", () => {
      const res = getDateNew("Tues/29/Apr/2017");
      expect(res).toEqual({ value: "none", label: "None found" });
    });
  });

  describe("Returns year if only year is available", () => {
    it("The Pocket Traverse = 2013", () => {
      const res = getDateNew(thePocketTraverse.Date);
      expect(res).toEqual({
        y: { integer: 2013, label: "2013", value: "2013" },
        text: { l: "2013", s: "2013" },
      });
    });
    it("The Mallard = 2012", () => {
      const res = getDateNew(theMallard.Date);
      expect(res).toEqual({
        y: { integer: 2012, label: "2012", value: "2012" },
        text: { l: "2012", s: "2012" },
      });
    });
    it("date string contains ??? for month and ?? for day", () => {
      const res = getDateNew("??/???/2012");
      expect(res).toEqual({
        y: { integer: 2012, label: "2012", value: "2012" },
        text: { l: "2012", s: "2012" },
      });
    });
  });

  describe("Returns year and month if only year and month are available", () => {
    it("Mackerel = August 2011", () => {
      const res = getDateNew(mackerel.Date);
      expect(res).toEqual({
        m: { integer: 8, label: "August", value: "aug" },
        y: { integer: 2011, label: "2011", value: "2011" },
        text: { l: "August 2011", s: "08/2011" },
      });
    });
    it("date string contains ?? for day", () => {
      const res = getDateNew("??/Aug/2019");
      expect(res).toEqual({
        m: { integer: 8, label: "August", value: "aug" },
        y: { integer: 2019, label: "2019", value: "2019" },
        text: { l: "August 2019", s: "08/2019" },
      });
    });
  });

  describe("Returns day, month, and year if all are available", () => {
    it("Fontanel", () => {
      const res = getDateNew(fontanel.Date);
      expect(res).toEqual({
        d: { integer: 29, label: "29th", value: "29" },
        m: { integer: 12, label: "December", value: "dec" },
        y: { integer: 2019, label: "2019", value: "2019" },
        text: { l: "29th December 2019", s: "29/12/2019" },
      });
    });
    it("Moby Dick", () => {
      const res = getDateNew(mobyDick.Date);
      expect(res).toEqual({
        d: { integer: 3, label: "3rd", value: "03" },
        m: { integer: 3, label: "March", value: "mar" },
        y: { integer: 2015, label: "2015", value: "2015" },
        text: { l: "3rd March 2015", s: "03/03/2015" },
      });
    });
    it("Hennessy Heights", () => {
      const res = getDateNew(bowles.Date);
      expect(res).toEqual({
        d: { integer: 1, label: "1st", value: "01" },
        m: { integer: 9, label: "September", value: "sep" },
        y: { integer: 2020, label: "2020", value: "2020" },
        text: { l: "1st September 2020", s: "01/09/2020" },
      });
    });
    it("Paranoid", () => {
      const res = getDateNew(paranoid.Date);
      expect(res).toEqual({
        d: { integer: 2, label: "2nd", value: "02" },
        m: { integer: 8, label: "August", value: "aug" },
        y: { integer: 2020, label: "2020", value: "2020" },
        text: { l: "2nd August 2020", s: "02/08/2020" },
      });
    });
  });
});
