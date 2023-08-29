import exp from "constants";

export type language = {
  value: string,
  label: string,
};

export type hard = {
  value: string,
  label: string,
};

export type soft = {
  label: string,
};

export type reference = {
  description: string,
  title: string,
}

export type contact = {
  address: string,
  email: string,
  phone?: string,
  linkedin?: string,
  github?: string,
}

export type school = {
  "from-month": string,
  "from-year": string,
  school: string,
  title: string,
  "to-month": string,
  "to-year": string,
}

export type work = {
  "from-month": string,
  "from-year": string,
  "to-month": string,
  "to-year": string,
  tools: string,
  title: string,
  results: string,
  responsibilities: string,
  company: string,
  current?: boolean,
  margin?: number,
}

export type image = {
  url: string
}