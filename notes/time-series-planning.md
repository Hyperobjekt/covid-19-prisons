# Time Series Planning

## Specification

- [On Google Docs](https://docs.google.com/document/d/1-HF_qHYv4SwlMuNmy7YPR2eWzmu_iDYmOOclo4nznF8/edit)

## Components

- FacilityTimeSeries
  - PopulationSelect
    - uses [material select](https://material-ui.com/components/selects/)
  - FacilitySelect
    - uses [material auto complete](https://material-ui.com/components/autocomplete/)
  - MetricSelect
    - uses [material select](https://material-ui.com/components/selects/)
  - TimeSeriesChart
    - recharts? visx? visgl? echarts?

## Wireframe

same as [prototype](http://104.131.72.50:3838/scraper_data/visualizations/ts-dashboard/), but without state dropdown

## Data Strategy

### 1. Backend Data Preparation

In this step, the large CSV file is reduced to smaller state-level files that can be loaded on demand. Create a node script that runs at build time that does the following:

1. fetch source [time series data](http://104.131.72.50:3838/scraper_data/summary_data/scraped_time_series.csv)
2. parse data
   - pull only required columns, use papa parse if you run into performance issues
3. re-shape data from long version to wide version (see [sample wide CSV](#sample-wide-csv))
4. split data set by state (see [d3.group](https://observablehq.com/@d3/d3-group))
5. write each state data set to a CSV file in `/static/data` (see [d3.csvFormat](https://github.com/d3/d3-dsv#csvFormat) and [debt collection lab example](https://github.com/Hyperobjekt/debt-collection-lab/blob/main/scripts/shape.js#L212)

#### sample wide CSV

JSON:

```json
[
  {
    "id": 1,
    "state": "Alabama",
    "name": "ALABAMA HEADQUARTERS",
    "res_confirmed": "2020-10-09|23;2020-10-09|23;...",
    "staff_confirmed": "2020-10-09|0;2020-10-09|0;...",
    ...
  },
  ...
]
```

converted to CSV with `csvFormat`:

```csv
id,state,name,res_confirmed,staff_confirmed,...
1,Alabama,ALABAMA HEADQUARTERS,2020-10-09|23;2020-10-09|23,2020-10-09|0;2020-10-09|0,...
```

> Note: the goal in this step is to create files that are reasonably sized to load on the front end. If any individual CSV files are larger than 10MB, we should re-evaluate our approach.

### 2. Frontend Data Loading

On the front end, pull data containing all facility names, identifiers, and corresponding states to use for facility search. On demand data loading follows this process:

1. user types into facility search and gets recommendations based on entered text
2. when the user selects a facility:

- check the data store to see if the facility data is already loaded. if it is loaded, go to the next step. if it is not loaded:
  - fetch the state file the facility belongs ([d3.csv](https://github.com/d3/d3-fetch#csv), see [debt collection lab parsing](https://github.com/Hyperobjekt/debt-collection-lab/blob/db270d2f81adce752b67ff39c95b506cdef2760e/gatsby-node.js#L137) for an example of parsing time series data)
  - load parsed data into the data store
  - hide loading indicator

3. render the trend line for the facility, add the facility name in selected facility list.

## Proposed Module Structure

```
FacilityTimeSeries/
  - components/
    - FacilityTimeSeries.js
    - PopulationSelect.js
    - FacilitySelect.js
    - MetricSelect.js
    - TimeSeriesChart.js
  - hooks/
    - useTimeSeriesStore.js
  - index.js
```
