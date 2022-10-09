export class Map {
  constructor(coords) {
    this.render(coords);
  }

  render(coordinates) {
    /* if (!google) {
      alert('Could not load maps library - please try again later!');
      return;
    }
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 16,
    });
    new google.maps.Marker({
      position: coordinates,
      map: this.map,
    }); */
    document.getElementById('map').innerHTML = ''; // clear the <p> in the <div id="map">
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
        zoom: 16,
      }),
    });
  }
}
