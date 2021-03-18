import en from "../../../content/en.json"

export const getLang = (...args) => {
  // filter out falsy values
  const key = args.filter(Boolean).join("_")
  return en[key] ? en[key] : key
}

/**
 * Performs string replacement before returning string.
 * @type {[type]}
 */
export const getLangWithArgs = (key, args) => {
  let str = en[key]
  const keys = Object.keys(args)
  keys.forEach((key, i) => {
    str = str.replace("${" + key + "}", args[key])
  })
  return str
}
