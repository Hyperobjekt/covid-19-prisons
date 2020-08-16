import MapboxMap from "../map";
import Legend from "../legend";
import {
  getBaseCircleStyle,
  getOutlineCircleStyle,
  getUnavailableCircleStyle,
} from "./layers";
import { getData, getSizeMap, getGeoJsonFromData } from "./data";
import MicroModal from "micromodal";
import renderTooltip from "./tooltip";

function App() {
  // full data set
  const fullData = getData();
  // data for the map
  const mapData = fullData.filter(
    (row) => !isNaN(row.lat) && !isNaN(row.lon)
  );
  // geojson feature collection for the dataset
  const geojson = getGeoJsonFromData(mapData);
  console.log(geojson);
  // map component for the map
  const map = MapboxMap(renderTooltip);
  // mapboxgl instance
  const mapInstance = map.getMapInstance();
  // create legend component
  const mapLegend = Legend();
  // state for the visualization
  let state;

  /**
   * Sets the app state and updates
   * @param {*} newState
   */
  function setState(newState) {
    state = { ...state, ...newState };
    state.sizeProp = [state.subgroup, state.type].join("_");
    state.sizeMap = getSizeMap(
      mapData,
      (d) => d[state.sizeProp]
    );
    update();
  }

  /**
   * Updates the map layers and legend
   */
  function update() {
    map.update(state);
    mapLegend.update(state);
  }

  // add map data source and layers on load
  mapInstance.on("load", () => {
    map.addSource("points", geojson);
    map.addLayer(
      "facilities-na",
      "points",
      getUnavailableCircleStyle
    );
    map.addLayer(
      "facilities-zero",
      "points",
      getOutlineCircleStyle
    );
    map.addLayer(
      "facilities-non-zero",
      "points",
      getBaseCircleStyle
    );

    update();
  });

  // initialize default state
  setState({
    subgroup: "res",
    type: "confirmed",
    sizeMap: getSizeMap(mapData, (d) => d["res_confirmed"]),
  });

  // initialize population selection
  var populationSelect = document.getElementById("population");
  populationSelect.addEventListener("change", function () {
    setState({ subgroup: this.value });
  });

  // initialize type selection
  var typeSelect = document.getElementById("type");
  typeSelect.addEventListener("change", function () {
    setState({ type: this.value });
  });

  MicroModal.init();
  // MicroModal.show("modal-1");
}

export default App;
