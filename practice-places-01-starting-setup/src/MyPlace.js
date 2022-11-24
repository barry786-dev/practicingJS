// import sanitize from 'sanitize-html';
import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;
    // headerTitleEl.innerHTML = sanitize(address);
  }
}
const url = new URL(location.href);
const queryParams = url.searchParams;

const coords = {
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng'),
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
