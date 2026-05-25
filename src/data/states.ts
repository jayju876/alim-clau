export type StateRecord = {
  name: string;
  code: string;
  slug: string;
  calculatorSlug: string;
  factor: number;
  cap?: number;
  durationNote: string;
  lawNote: string;
  sourceNote: string;
};

const names = [
  ["Alabama", "AL"], ["Alaska", "AK"], ["Arizona", "AZ"], ["Arkansas", "AR"],
  ["California", "CA"], ["Colorado", "CO"], ["Connecticut", "CT"], ["Delaware", "DE"],
  ["Florida", "FL"], ["Georgia", "GA"], ["Hawaii", "HI"], ["Idaho", "ID"],
  ["Illinois", "IL"], ["Indiana", "IN"], ["Iowa", "IA"], ["Kansas", "KS"],
  ["Kentucky", "KY"], ["Louisiana", "LA"], ["Maine", "ME"], ["Maryland", "MD"],
  ["Massachusetts", "MA"], ["Michigan", "MI"], ["Minnesota", "MN"], ["Mississippi", "MS"],
  ["Missouri", "MO"], ["Montana", "MT"], ["Nebraska", "NE"], ["Nevada", "NV"],
  ["New Hampshire", "NH"], ["New Jersey", "NJ"], ["New Mexico", "NM"], ["New York", "NY"],
  ["North Carolina", "NC"], ["North Dakota", "ND"], ["Ohio", "OH"], ["Oklahoma", "OK"],
  ["Oregon", "OR"], ["Pennsylvania", "PA"], ["Rhode Island", "RI"], ["South Carolina", "SC"],
  ["South Dakota", "SD"], ["Tennessee", "TN"], ["Texas", "TX"], ["Utah", "UT"],
  ["Vermont", "VT"], ["Virginia", "VA"], ["Washington", "WA"], ["West Virginia", "WV"],
  ["Wisconsin", "WI"], ["Wyoming", "WY"]
];

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const overrides: Record<string, Partial<StateRecord>> = {
  California: {
    factor: 0.35,
    durationNote: "California courts often evaluate temporary support under local county formulas while long-term support depends on Family Code factors and judicial discretion.",
    lawNote: "California support analysis focuses on marital standard of living, earning capacity, marketable skills, contributions to education or career, needs, assets, obligations, and domestic violence considerations."
  },
  Texas: {
    factor: 0.2,
    cap: 5000,
    durationNote: "Texas maintenance is generally limited by statute and duration commonly depends on marriage length and qualifying circumstances.",
    lawNote: "Texas uses narrow eligibility rules for court-ordered maintenance, with statutory caps and limits that differ from broader equitable-support states."
  },
  Florida: {
    factor: 0.28,
    durationNote: "Florida evaluates support after classifying marriage duration and considering need, ability to pay, and equitable factors.",
    lawNote: "Florida alimony analysis considers need and ability to pay, duration of marriage, standard of living, age, health, earning capacity, contributions, and parenting responsibilities."
  },
  "New York": {
    factor: 0.3,
    durationNote: "New York has statutory formulas for temporary and post-divorce maintenance, subject to income caps and court adjustments.",
    lawNote: "New York maintenance calculations may use guideline formulas, but courts can deviate after reviewing statutory factors and the facts of the case."
  }
};

export const states: StateRecord[] = names.map(([name, code], index) => {
  const factor = 0.24 + (index % 7) * 0.015;
  const base: StateRecord = {
    name,
    code,
    slug: slugify(name),
    calculatorSlug: `${slugify(name)}-alimony-calculator`,
    factor,
    durationNote: `${name} courts usually connect support duration to marriage length, need, ability to pay, and whether support is temporary, rehabilitative, durational, or long-term.`,
    lawNote: `${name} alimony decisions are fact-specific. Courts commonly review income, earning capacity, property division, health, age, marital standard of living, child-related obligations, and each spouse's financial need.`,
    sourceNote: `${name} family law statutes, court self-help resources, and publicly available state judiciary materials.`
  };

  return { ...base, ...overrides[name] };
});

export const featuredStates = states.filter((state) =>
  ["California", "Texas", "Florida", "New York"].includes(state.name)
);

export const getStateBySlug = (slug = "") => {
  const normalized = slug.replace(/-alimony-calculator$/, "");
  return states.find((state) => state.slug === normalized || state.calculatorSlug === slug);
};

export const getStateUrl = (state: StateRecord) => `/${state.calculatorSlug}`;
