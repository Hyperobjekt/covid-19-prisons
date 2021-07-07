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

/**
 * Updates a specified field within the provided fields array.  This
 * mutates the original fields array that is passed.
 * @param {Array} fields
 * @param {string|Array<string>} pathParts
 * @returns
 */
export const updateField = (fields = [], pathParts = [], updates = {}) => {
  pathParts = Array.isArray(pathParts) ? pathParts : pathParts.split(".");
  if (fields.length === 0 || pathParts.length === 0) return null;
  let fieldIndex = -1;
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].name === pathParts[0]) fieldIndex = i;
  }
  // exit early if no match
  if (fieldIndex < 0) return;
  // we are at the end of the path tree, update the field
  if (pathParts.length === 1) {
    fields[fieldIndex] = {
      ...fields[fieldIndex],
      ...updates,
    };
  }

  // we are not at the end of the path tree
  pathParts.shift(); // remove first part of the path
  return updateField(fields[fieldIndex].fields, pathParts, updates);
};
