const GOOGLE_API_KEY = '';
// {lat: 50.4752342, lng: 6.5731188}
export async function getAddressFromCoords(coords) {
  const { lat, lng: lon } = coords;
  // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY`
  // );
  const response = await fetch(
    `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${process.env.TOM_TOM_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch address, please try again');
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  // const address = data.results[0].formatted_address; // google
  const address = data.addresses[0].address.freeformAddress;
  return address;
}
export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
  // );
  const response = await fetch(
    `https://api.tomtom.com/search/2/geocode/${urlAddress}.json?key=${process.env.TOM_TOM_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates, please try again');
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  // const coordinates = data.results[0].geometry.location; // this is for google
  const coordinates = data.results[0].position;
  return coordinates;
}
