/**
 * Abbreviations that should be forced to uppercase
 */
const UPPER_CASE = [
  "fci",
  "usp",
  "ccw",
  "cw",
  "cc",
  "ci",
  "cf",
  "ciw",
  "cim",
  "cvsp",
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
  "sq",
  "ca",
  "prc",
  "fsp",
  "llc",
  "rcc",
  "cmf",
  "dvi",
  "cmc",
  "svsp",
  "crc",
  "nwfrc",
  "ii",
  "sfrc",
  "fdc",
  "gdcp",
  "smu",
  "rci",
  "wci",
  "nbci",
  "asp",
  "cs",
  "imcc",
]

/**
 * Fixes casing on strings THAT ARE ALL UPPERCASE
 * so that They Have Title Casing
 * @param {string} str
 */
function fixCasing(str) {
  if (!str) return ""
  const result = str
    .toLowerCase()
    .replace(/\b\w/g, (v) => v.toString(v).toUpperCase())
    .split(" ")
    .map((v) =>
      UPPER_CASE.indexOf(v.toLowerCase()) > -1 ? v.toUpperCase() : v
    )
    .join(" ")
  return result
}

export const parseFacility = (facility = {}) => {
  const result = { ...facility }

  // parse coordinates
  if (
    facility.hasOwnProperty("Latitude") &&
    facility.hasOwnProperty("Longitude")
  ) {
    result.Latitude = parseFloat(facility["Latitude"])
    result.Longitude = parseFloat(facility["Longitude"])
    result.coords = [result.Longitude, result.Latitude]
  }

  // parse residents data
  if (facility.hasOwnProperty("Residents")) {
    result.Residents = Object.keys(facility.Residents).reduce((obj, key) => {
      obj[key] = parseInt(facility.Residents[key])
      return obj
    }, {})
  }

  // parse staff data
  if (facility.hasOwnProperty("Staff")) {
    result.Staff = Object.keys(facility.Staff).reduce((obj, key) => {
      obj[key] = parseInt(facility.Staff[key])
      return obj
    }, {})
  }

  // parse population
  if (facility.hasOwnProperty("PopulationCount")) {
    result.PopulationCount = parseInt(facility.PopulationCount)
  }

  if (facility.hasOwnProperty("Name")) {
    result.Name = fixCasing(facility.Name)
  }

  return result
}
