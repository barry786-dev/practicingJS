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

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": () => (/* binding */ Modal)
/* harmony export */ });
class Modal {
  constructor(contentId, fallbackText, messageArray) {
    this.messageArray = messageArray || [];
    this.fallbackText = fallbackText || 'Loading...';
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById('modal-template');
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(this.modalTemplateEl.content, true);
      this.modalElement = modalElements.querySelector('.modal');
      this.backdropElement = modalElements.querySelector('.backdrop');
      const contentElement = document.importNode(this.contentTemplateEl.content, true);

      if (this.messageArray.length) {
        this.modalElement.addEventListener('click', this.hide.bind(this));
        const h1 = contentElement.querySelector('h1');
        const p = contentElement.querySelector('p');
        h1.innerHTML = this.messageArray[0];
        p.innerHTML = this.messageArray[1];
      }

      this.modalElement.appendChild(contentElement);
      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove();

      document.body.removeChild(this.backdropElement);
      this.modalElement = null; //clean up from memory

      this.backdropElement = null;
      this.messageArray = [];
    }
  }

}

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAddressFromCoords": () => (/* binding */ getAddressFromCoords),
/* harmony export */   "getCoordsFromAddress": () => (/* binding */ getCoordsFromAddress)
/* harmony export */ });
const GOOGLE_API_KEY = ''; // {lat: 50.4752342, lng: 6.5731188}

async function getAddressFromCoords(coords) {
  const {
    lat,
    lng: lon
  } = coords; // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY`
  // );

  const response = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${"Ny4sBxGXq41kGbG69wvKWqL5aGeJhOsv"}`);

  if (!response.ok) {
    throw new Error('Failed to fetch address, please try again');
  }

  const data = await response.json();

  if (data.error_message) {
    throw new Error(data.error_message);
  } // const address = data.results[0].formatted_address; // google


  console.log(data.addresses[0].address);
  const address = data.addresses[0].address.freeformAddress;
  return address;
}
async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address); // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
  // );

  const response = await fetch(`https://api.tomtom.com/search/2/geocode/${urlAddress}.json?key=${"Ny4sBxGXq41kGbG69wvKWqL5aGeJhOsv"}`);

  if (!response.ok) {
    throw new Error('Failed to fetch coordinates, please try again');
  }

  const data = await response.json();

  if (data.error_message) {
    throw new Error(data.error_message);
  } // const coordinates = data.results[0].geometry.location; // this is for google


  console.log(data.results[0]);
  const coordinates = data.results[0].position;
  const fullAddress = data.results[0].address.freeformAddress;
  return [coordinates, fullAddress];
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
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal.js */ "./src/UI/Modal.js");
/* harmony import */ var _UI_Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map.js */ "./src/UI/Map.js");
/* harmony import */ var _Utility_Location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location */ "./src/Utility/Location.js");




class PlaceFinder {
  constructor() {
    this.addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.sharedLinkInputElement = document.getElementById('share-link');
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    this.addressForm.addEventListener('submit', e => this.findAddressHandler(e));
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard.writeText(this.sharedLinkInputElement.value).then(() => {
      alert('the address link is copied into the clipboard');
    }).catch(err => {
      console.log(err);
      this.sharedLinkInputElement.select();
    });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new _UI_Map_js__WEBPACK_IMPORTED_MODULE_1__.Map(coordinates);
    }

    console.log(address);
    /* fetch(
      `http://localhost:3000/location?address=${encodeURI(address)}&lat=${
        coordinates.lat
      }&lng=${coordinates.lng}`,
      {
        method: 'POST',
        body: JSON.stringify({
          address: address,
          lat: coordinates.lat,
          lng: coordinates.lng,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const locationId = data.locId;
        this.shareBtn.disabled = false;
        this.sharedLinkInputElement.value = `${location.origin}/my-place?location=${locationId}`;
      }); */

    this.shareBtn.disabled = false;
    this.sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature is not available in your browser - please use a more modern browser or manually enter an address.');
      return;
    }

    const modal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__.Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(async successResult => {
      const coordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude
      };
      console.log(coordinates);
      const address = await (0,_Utility_Location__WEBPACK_IMPORTED_MODULE_2__.getAddressFromCoords)(coordinates);
      setTimeout(() => {
        modal.hide();
      }, 1000);
      this.selectPlace(coordinates, address);
    }, error => {
      modal.hide();
      alert('Could not locate you unfortunately. Please enter an address manually!');
    });
  }

  async findAddressHandler(event) {
    event.preventDefault();
    /* const formData = new FormData(this.addressForm);
    const formDataObject = Object.fromEntries(formData.entries());
    const address = formDataObject.address */

    const address = event.target.querySelector('input').value;

    if (!address || address.trim().length === 0) {
      const errorModal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__.Modal('error-content', 'Loading location - please wait!', ['Wrong Entries', 'you can not enter empty values in the Address field']);
      errorModal.show();
      return;
    }

    const modal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__.Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();

    try {
      const addressInfo = await (0,_Utility_Location__WEBPACK_IMPORTED_MODULE_2__.getCoordsFromAddress)(address);
      const coordinates = addressInfo[0];
      const fullAddress = addressInfo[1];
      const coordinatesForOL = {
        lat: coordinates.lat,
        lng: coordinates.lon
      };
      this.selectPlace(coordinatesForOL, fullAddress);
    } catch (err) {
      modal.hide();
      setTimeout(() => {
        alert(err.message);
      }, 100);
    }

    modal.hide();
  }

}

new PlaceFinder();
/* export async function getAddressFromCoords(coords) {
  return '6th Avenue'; // return any dummy address you want
}

export async function getCoordsFromAddress(address) {
  return { lat: 47.01, lng: 33.55 }; // return any dummy coordinates you want
} */
})();

/******/ })()
;
//# sourceMappingURL=SharePlace.js.map