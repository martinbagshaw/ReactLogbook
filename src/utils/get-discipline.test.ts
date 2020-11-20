import { cleanup } from "@testing-library/react";

import { getDiscipline } from "./get-discipline";
import {
  backInTime,
  benMacdui,
  carrera,
  chulilla,
  contamineRoute,
  crabParty,
  guillotine,
  hadriansWallDirect,
  italianRightHand,
  leMarchandDeSable,
  manilowMagic,
  mobyDick,
  onTheRoad,
  panthersWall,
  portfolio,
  temporaryLifestyle,
  theOverhang,
} from "./test-data/test-data";

afterEach(cleanup);

describe("getDiscipline tests", () => {
  describe("invalid grade or style", () => {
    it("no values entered", () => {
      const res = getDiscipline();
      expect(res).toEqual({ value: "none", label: "None found" });
    });
    it("falsy grade", () => {
      const res = getDiscipline(undefined);
      expect(res).toEqual({ value: "none", label: "None found" });
    });
  });

  describe("Alpine Climbs", () => {
    it("Le Marchand de Sable - Alpine Climb", () => {
      const { Grade, Style } = leMarchandDeSable;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "alpine", label: "Alpine" });
    });
    it("Contamine Route - Alpine Climb", () => {
      const { Grade, Style } = contamineRoute;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "alpine", label: "Alpine" });
    });
  });

  describe("Deep Water Solos", () => {
    it("Manilow Magic = DWS", () => {
      const { Grade, Style } = manilowMagic;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "dws", label: "Deep Water Solo" });
    });
    it("Temporary Lifestyle = DWS", () => {
      const { Grade, Style } = temporaryLifestyle;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "dws", label: "Deep Water Solo" });
    });
  });

  // remove? - covers a lot
  // describe("Solos", () => {
  //   it("The Overhang = Solo", () => {
  //     const { Grade, Style } = theOverhang;
  //     const res = getDiscipline(Grade, Style);
  //     expect(res).toEqual({ value: "solo", label: "Solo" });
  //   });
  //   it("Portfolio = Solo", () => {
  //     const { Grade, Style } = portfolio;
  //     const res = getDiscipline(Grade, Style);
  //     expect(res).toEqual({ value: "solo", label: "Solo" });
  //   });
  // });

  describe("Ice Climbs", () => {
    it("Moby Dick = Ice Climb", () => {
      const { Grade, Style } = mobyDick;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "ice", label: "Ice" });
    });
  });

  describe("Mixed climbs", () => {
    it("Back In Time = mixed climb", () => {
      const { Grade, Style } = backInTime;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "mixed", label: "Mixed / dry tool" });
    });
  });

  describe("Sport climbs", () => {
    it("On The Road - sport", () => {
      const { Grade, Style } = onTheRoad;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "sport", label: "Sport" });
    });
    it("Chulilla - sport", () => {
      const { Grade, Style } = chulilla;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "sport", label: "Sport" });
    });
    it("Manilow Magic - deep water solo that has a sport grade", () => {
      const { Grade, Style } = manilowMagic;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "dws", label: "Deep Water Solo" });
    });
  });

  describe("Trad climbs", () => {
    it("Guillotine - trad", () => {
      const { Grade, Style } = guillotine;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "trad", label: "Trad" });
    });
    it("Portfolio - trad", () => {
      const { Grade, Style } = portfolio;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "trad", label: "Trad" });
    });
    it("The Overhang - trad", () => {
      const { Grade, Style } = theOverhang;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "trad", label: "Trad" });
    });
    it("Crab Party - deep water solo that is a trad climb", () => {
      const { Grade, Style } = crabParty;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "dws", label: "Deep Water Solo" });
    });
    it("Carrera - trad top rope climb", () => {
      const { Grade, Style } = carrera;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "trad", label: "Trad" });
    });
    it("Panther's Wall - trad top rope climb", () => {
      const { Grade, Style } = panthersWall;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "trad", label: "Trad" });
    });
  });

  describe("Summit walks", () => {
    it("Ben Macdui - summit walk", () => {
      const { Grade, Style } = benMacdui;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "summit", label: "Summit walk" });
    });
  });

  describe("Winter climbs", () => {
    it("Italian Right Hand - winter climb", () => {
      const { Grade, Style } = italianRightHand;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "winter", label: "Winter climb" });
    });
    it("Hadrian's Wall Direct - winter climb", () => {
      const { Grade, Style } = hadriansWallDirect;
      const res = getDiscipline(Grade, Style);
      expect(res).toEqual({ value: "winter", label: "Winter climb" });
    });
  });
});
