/**
 * Helper for creating string fields.  Automatically creates
 * name from label, and sets common defaults.
 * @param {*} label
 * @param {*} extra
 * @returns
 */
export const makeStringField = (label, overrides = {}) => {
  return {
    label,
    name: label
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/\(/g, "")
      .replace(/\)/g, ""),
    widget: "string",
    default: "",
    ...overrides,
  };
};

export const makeTextField = (label, overrides = {}) => {
  return makeStringField(label, { ...overrides, widget: "text" });
};
