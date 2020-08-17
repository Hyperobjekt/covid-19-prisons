export const PROPERTY_MAP = {
  Name: "name",
  City: "city",
  "County.FIPS": "county",
  "Facility.Type": "facility",
  Latitude: "lat",
  Longitude: "lon",
  State: "state",
  "Residents.Confirmed": "res_confirmed",
  "Residents.Tested": "res_tested",
  "Residents.Deaths": "res_deaths",
  "Residents.Recovered": "res_recovered",
  "Residents.Negative": "res_negative",
  "Residents.Pending": "res_pending",
  "Residents.Population": "res_population",
  "Residents.Quarantine": "res_quarantine",
  "Staff.Confirmed": "stf_confirmed",
  "Staff.Tested": "stf_tested",
  "Staff.Deaths": "stf_deaths",
  "Staff.Recovered": "stf_recovered",
  "Staff.Negative": "stf_negative",
  "Staff.Pending": "stf_pending",
  "Staff.Population": "stf_population",
  "Staff.Quarantine": "stf_quarantine",
};

export const STATE_LEVEL_TOTALS = [
  "res_confirmed",
  "res_tested",
  "res_deaths",
  "res_recovered",
  "res_negative",
  "res_pending",
  "res_population",
  "res_quarantine",
  "stf_confirmed",
  "stf_tested",
  "stf_deaths",
  "stf_recovered",
  "stf_negative",
  "stf_pending",
  "stf_population",
  "stf_quarantine",
];

export const UPPER_CASE = [
  "fci",
  "usp",
  "ccw",
  "cw",
  "cc",
  "ci",
  "cf",
  "col",
  "atc",
  "mcc",
  "pdc",
  "mci",
  "smcc",
  "mdc",
  "crv",
  "iwp",
  "sbwc",
  "fmc",
  "li",
];

export const VALUE_RANGES = {
  res_confirmed: [1, 1000],
};
