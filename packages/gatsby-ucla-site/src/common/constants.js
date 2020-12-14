import { format as d3Format } from "d3-format"

export const KEYS = {
  jurisdiction: "jurisdiction",
  state: "state",
  cases: "confirmed",
  deaths: "deaths",
  active: "active",
  population: "population",
}

export const GROUPS = ["residents", "staff"]

export const JURISDICTIONS = ["state", "federal", "county"]

export const METRICS = {
  residents: [
    "confirmed",
    "deaths",
    "active",
    "confirmed_rate",
    "deaths_rate",
    "active_rate",
  ],
  staff: ["confirmed", "deaths", "active"],
}

export const METRIC_FORMATTERS = {
  confirmed: d3Format(",d"),
  deaths: d3Format(",d"),
  active: d3Format(",d"),
  confirmed_rate: d3Format(".2%"),
  deaths_rate: d3Format(".2%"),
  active_rate: d3Format(".2%"),
  count_legend: d3Format(".2s"),
  rate_legend: d3Format(".1%"),
}

export const JURISDICTION_COLORS = ["#CA7F26", "#6BA084", "#758EAC", "#555526"]

export const JURISDICTION_GRADIENTS = [
  "url(#g1)",
  "url(#g2)",
  "url(#g3)",
  "url(#g4)",
]
