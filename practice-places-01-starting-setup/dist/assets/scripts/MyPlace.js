/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Map": () => (/* binding */ Map)
/* harmony export */ });
class Map {
  constructor(coords) {
    this.coordinates = coords;
    this.render();
  }

  render() {
    /* if (!google) {
      alert('Could not load maps library - please try again later!');
      return;
    }
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.coordinates,
      zoom: 16,
    });
    new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    }); */
    document.getElementById('map').innerHTML = ''; // clear the <p> in the <div id="map">

    const map = new ol.Map({
      target: 'map',
      layers: [new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.coordinates.lng, this.coordinates.lat]),
        maxZoom: 18,
        zoom: 16
      })
    });
    const markers = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([this.coordinates.lng, this.coordinates.lat]))
        })]
      }) // style: new ol.style.Style({
      //   image: new ol.style.Icon({
      //     anchor: [0.5, 1],
      //     src: 'marker.png',
      //   }),
      // }),

    });
    /* const marker = new ol.Feature(
      new ol.geom.Point(
        ol.proj.fromLonLat([this.coordinates.lng, this.coordinates.lat])
      )
    );
    markers.getSource().addFeature(marker); */

    map.addLayer(markers);
    /* Add popup when click on the marker */

    if (document.getElementById('popup')) {
      this.container = document.getElementById('popup');
      this.content = document.getElementById('popup-content');
      this.closer = document.getElementById('popup-closer');
    }

    const overlay = new ol.Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    map.addOverlay(overlay);
    /* this.closer.onclick = function () {
      overlay.setPosition(undefined);
     this.closer.blur();
      return false;
    }; */

    map.on('click', event => {
      if (map.hasFeatureAtPixel(event.pixel) === true) {
        const coordinate = event.coordinate;
        this.content.innerHTML = `<b>${coordinate[0]}</b><br />${coordinate[1]}`;
        overlay.setPosition(coordinate);
      } else {
        overlay.setPosition(undefined);
        this.closer.blur();
      }
    });
  }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/MyPlace.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Map */ "./src/UI/Map.js");
// import sanitize from 'sanitize-html';


class LoadedPlace {
  constructor(coordinates, address) {
    new _UI_Map__WEBPACK_IMPORTED_MODULE_0__.Map(coordinates);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address; // headerTitleEl.innerHTML = sanitize(address);
  }

}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng')
};
const address = queryParams.get('address');
/* const locId = queryParams.get('location');
fetch(`http://localhost:3000/location/${locId}`)
  .then(async (res) => {
    if (res.status === 404) {
      const response = await res.json();
      throw new Error(`${response.message} :>>> ${response.err}`);
    } else {
      return res.json();
    } // end if
  })
  .then((data) => {
    new LoadedPlace(data.coords, data.address);
  })
  .catch((err) => {
    alert(err.message);
    // location.href = '/';
  }); */

new LoadedPlace(coords, address);
})();

/******/ })()
;
//# sourceMappingURL=MyPlace.js.map