export class Map {
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
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([
          this.coordinates.lng,
          this.coordinates.lat,
        ]),
        maxZoom: 18,
        zoom: 16,
      }),
    });

    const markers = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([this.coordinates.lng, this.coordinates.lat])
            ),
          }),
        ],
      }),
      // style: new ol.style.Style({
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
        duration: 250,
      },
    });
    map.addOverlay(overlay);
    /* this.closer.onclick = function () {
      overlay.setPosition(undefined);
     this.closer.blur();
      return false;
    }; */
    map.on('click', (event) => {
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
