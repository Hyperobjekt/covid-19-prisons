import { formatMetricValue } from "../../common/utils/formatters";
import { format } from "d3-format";
import { isNumber } from "../../common/utils/selectors";

/** Formatter for integer values */
export const intFormatter = format(",d");

/** Formatter for percent values */
export const perFormatter = (v) => formatMetricValue(v, "home_table_rate");

/** Format counts, replace unavailable with "--" */
export const countFormatter = (value) =>
  !isNumber(value) ? "--" : intFormatter(value);

/** Format rates, replace unavailable with "--" */
export const rateFormatter = (value) =>
  !isNumber(value) ? "--" : perFormatter(value);

/** Sorter function for rate values */
export const rateSorter = (a, b, columnId) => {
  const vals = [a, b].map((v) => v["original"]["residents"][columnId]);
  if (isNumber(vals[0]) && !isNumber(vals[1])) return 1;
  if (!isNumber(vals[0]) && isNumber(vals[1])) return -1;
  if (!isNumber(vals[0]) && !isNumber(vals[1])) return 0;
  const diff = vals[0] - vals[1];
  return diff < 0 ? -1 : 1;
};
