/*
 * getDiscipline
 * inputs: grade and style
 * output: discipline (formatted for select)
 * (alpine, boulder, dws, ice, mixed, solo, sport, trad, summit walk, winter)
 *
 * - Makes as few assumptions as possible, though there are some:
 * - Discipline relates heavily to style, e.g. DWS overrides 'trad' or 'sport'
 * - Discipline of foreign routes (trad and sport) hard to discern with available data:
 *   - US. 5.10 grades could be trad or sport. Same with Norse
 *
 */

import { DisciplineType } from "./types";

export const getDiscipline = (gradeInput?: string, styleInput?: string): DisciplineType => {
  if (!gradeInput || (!gradeInput && !styleInput)) {
    return { value: "none", label: "None found" };
  }
  const grade = gradeInput.replace(/\*+$/, "").trim();

  // alpine
  // <F PD AD D TD ED>, <with or without a +>, <space> <french sport grade>
  if (grade && /^(F|PD|AD|D|TD|ED)\+?\s[0-9][a-c]/.test(grade)) {
    return { value: "alpine", label: "Alpine" };
  }
  // boulder
  if (grade && /^f[0-5]\+?$/.test(grade) || /^f[6-9][A-C]\+?$/.test(grade)) {
    return { value: "boulder", label: "Boulder Problem" };
  }
  // dws
  if (styleInput && /^DWS/.test(styleInput)) {
    return { value: "dws", label: "Deep Water Solo" };
  }
  // ice
  if (grade && /^WI-/.test(grade)) {
    return { value: "ice", label: "Ice" };
  }
  // mixed
  if (grade && /^M[0-9]/.test(grade)) {
    return { value: "mixed", label: "Mixed / dry tool" };
  }
  // sport
  // <french sport grade> ends with a + or a-c
  if (grade && /^[0-9][a-c]\+?$/.test(grade)) {
    return { value: "sport", label: "Sport" };
  }
  // summit
  if (grade && /^summit/.test(grade)) {
    return { value: "summit", label: "Summit walk" };
  }
  // trad
  // M, D, VD, HVD HS, MVS, VS, HVS, E[0-9], <french sport grade without +>
  // <french sport grade without +> space <french sport grade without +>
  if (
    (grade && /^(M|D|VD|HVD|HS|MVS|VS|HVS|E[0-9])\s[0-9][a-c]/.test(grade)) ||
    /^[0-9][a-c]\s[0-9][a-c]/.test(grade)
  ) {
    return { value: "trad", label: "Trad" };
  }
  // winter
  if (grade && /^(V|I|X)*\s[0-9]/.test(grade)) {
    return { value: "winter", label: "Winter climb" };
  }

  return { value: "unknown", label: "Unable to determine" };
};
