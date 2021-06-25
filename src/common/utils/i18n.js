import en from "../../../content/lang/en.json";

export const createDictFromArray = (keyValueArray) => {
  return keyValueArray.reduce((dict, current) => {
    dict[current.key] = current.value;
    return dict;
  }, {});
};

const enDict = createDictFromArray(en.lang);

export const getLang = (...args) => {
  // filter out falsy values
  const key = args.filter(Boolean).join("_");
  return enDict[key] ? enDict[key] : key;
};

/**
 * Performs string replacement before returning string.
 * @type {[type]}
 */
export const getLangWithArgs = (key, args) => {
  let str = enDict[key];
  const keys = Object.keys(args);
  keys.forEach((key, i) => {
    str = str.replace("${" + key + "}", args[key]);
  });
  return str;
};
