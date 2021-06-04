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
  "ice",
]

/**
 * All ways DC is represented in source data (in lower case)
 */
const DC_VARIANTS = ["dc", "district of columbia", "district of col"]

/**
 * Fixes casing on strings THAT ARE ALL UPPERCASE
 * so that They Have Title Casing
 * @param {string} str
 */
function fixCasing(str) {
  if (!str) return "Unknown"
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

/**
 * Fixes for inconsistent state naming
 * @param {string} str
 */
function formatState(str) {
  return DC_VARIANTS.includes(str.toLowerCase()) ? "District of Columbia" : str
}

/**
 * Splits any keys with a "." into a nested object
 * @param {*} data
 */
const groupObjectData = (data) =>
  Object.keys(data).reduce((obj, key) => {
    if (key.indexOf(".") > -1) {
      const [group, ...rest] = key.split(".")
      const first = group.toLowerCase()
      const second = rest.map((r) => r.toLowerCase()).join(".")
      if (!obj.hasOwnProperty(first)) obj[first] = {}
      obj[first][second] = data[key]
    } else {
      obj[key.toLowerCase()] = data[key]
    }
    return obj
  }, {})

/**
 * Parses a facility object
 * @param {*} facility
 */
const parseFacility = (facility = {}) => {
  const source = groupObjectData(facility)

  const residentKeys = [
    "confirmed",
    "deaths",
    "active",
    "population",
    "released",
    "recovered",
    "tadmin",
  ]
  const residentRates = ["confirmed", "deaths", "active", "tested"]
  const staffKeys = ["confirmed", "deaths", "active"]

  const result = {}

  result.name = fixCasing(source.name)
  result.jurisdiction = source["jurisdiction"]
  result.city = source["city"]
  result.state = formatState(source["state"])
  result.date = Date.parse(source["date"])

  // parse coordinates
  const Latitude = parseFloat(source["latitude"])
  const Longitude = parseFloat(source["longitude"])
  result.coords = [Longitude, Latitude]

  // NOTE should now always be true
  const useAltPopCol = source.population && source.population.feb20

  // parse residents data
  result.residents = residentKeys.reduce((obj, key) => {
    if (key === "tadmin") {
      obj["tested"] = parseInt(source.residents[key])
      return obj
    } else if (key === "population" && useAltPopCol) {
      obj["population"] = parseInt(source.population.feb20)
      return obj
    } else {
      obj[key] = parseInt(source.residents[key])
      return obj
    }
  }, {})

  // add field office id
  result.iceFieldOffice = source.ice["field.office"] || null

  // add rates
  residentRates.forEach((rateType) => {
    result.residents[rateType + "_rate"] = result.residents.population
      ? result.residents[rateType] / result.residents.population
      : null
  })

  // parse staff data
  result.staff = staffKeys.reduce((obj, key) => {
    obj[key] = parseInt(source.staff[key])
    return obj
  }, {})

  return result
}

/**
 * Parses a vaccine object
 * @param {*} vaccine
 */
const parseVaccine = (vaccine = {}) => {
  const source = groupObjectData(vaccine)

  const residentKeys = ["initiated", "population.jan21"]
  // to change name from spreadsheet on import
  const residentKeyMap = { "population.jan21": "population" }
  const staffKeys = ["initiated", "population"]

  const result = {}

  const jurisMap = {
    federal: "Federal Bureau of Prisons",
    ice: "ICE Detention",
  }

  const nonStateMap = {
    federal: true,
    ice: true,
  }

  result.jurisdiction = jurisMap[source.state.toLowerCase()] || source.state
  result.isState = !nonStateMap[source.state.toLowerCase()]
  result.isIce = source.state.toLowerCase() === "ice"
  result.isFederal = source.state.toLowerCase() === "federal"

  // parse staff data
  result.staff = staffKeys.reduce((obj, key) => {
    obj[key] = parseInt(source.staff[key])
    return obj
  }, {})

  // parse residents data
  result.residents = residentKeys.reduce((obj, key) => {
    const ourKey = residentKeyMap[key] || key
    obj[ourKey] = parseInt(source.residents[key])
    return obj
  }, {})

  return result
}

const parseIntComma = (value) => parseInt(value.replace(/,/g, ""))
const parseFloatComma = (value) => parseFloat(value.replace(/,/g, ""))

const getParser = (type) => {
  // if it's already a parsing function, return it
  if (typeof type === "function") return type
  switch (type) {
    case "int":
      return parseIntComma
    case "float":
      return parseFloatComma
    case "string":
      return (a) => a.trim()
    default:
      // do nothing by default
      return (a) => a
  }
}

// checks if b is exact match to a
const exactMatch = (a, b) => a.toLowerCase() === b.toLowerCase() && a

// checks if b is contained within a
const roughMatch = (a, b) => a.toLowerCase().indexOf(b.toLowerCase()) > -1 && a

// checks if the regex matches the key
const regexMatch = (a, b) => {
  const regex = new RegExp(b)
  const matches = a.match(regex)
  return !!matches && a
}

const getSourceValue = (row, colName, checkMatch = exactMatch) => {
  const keys = Object.keys(row)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const matchKey = checkMatch(key, colName, row)
    if (matchKey) return row[matchKey]
  }
  console.warn("no match for column: ", colName)
  console.debug("column names are: ", keys.join("\n"))
}

const parseMap = (row, colMap) => {
  const result = {}
  Object.keys(colMap).forEach((colName) => {
    const [sourceCol, parser, selector] = colMap[colName]
    const valueParser = getParser(parser)
    const rawValue = getSourceValue(row, sourceCol, selector)
    let parsedValue = valueParser(rawValue)
    if ((parser === "int" || parser === "float") && isNaN(parsedValue))
      parsedValue = null

    if (colName === "state") {
      parsedValue = formatState(parsedValue)
    }
    result[colName] = parsedValue
  })
  return result
}

module.exports = {
  parseFacility,
  parseVaccine,
  parseMap,
  exactMatch,
  roughMatch,
  regexMatch,
}
