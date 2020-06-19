import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GlobalStateContext } from "./../lib/GlobalContext";
import ISSPosition from "./ISSPosition";

type MapProps = {
  center: any;
  zoom: any;
};

interface latLng {
  lat: number;
  lng: number;
}

export default class Map extends Component<MapProps> {
  renderPolylines(map, maps) {
    // Example of rendering non geodesic polyline (straight line)
    const markers: latLng[] = [
      { lat: 59.955413, lng: 30.337844 },
      { lat: 59.965563, lng: 30.337844 },
    ];

    let nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: "#FF9F32",
      strokeOpacity: 0.7,
      strokeWeight: 3,
    });
    nonGeodesicPolyline.setMap(map);

    this.fitBounds(markers, map, maps);
  }

  fitBounds(markers, map, maps) {
    var bounds = new maps.LatLngBounds();
    for (let marker of markers) {
      bounds.extend(new maps.LatLng(marker.lat, marker.lng));
    }
    map.fitBounds(bounds);
  }

  render() {
    const { center, zoom } = this.props;

    return (
      <GlobalStateContext.Consumer>
        {(context: any) => (
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key:
                  "" /* add google api key here for a production quality product*/,
              }}
              defaultCenter={center}
              defaultZoom={zoom}
              onGoogleApiLoaded={({ map, maps }) =>
                this.renderPolylines(map, maps)
              }
            >
              <ISSPosition key={"dsf"} lat={59.955413} lng={30.337844} />
              <ISSPosition key={"dsf2"} lat={59.965563} lng={30.337844} />
            </GoogleMapReact>
          </div>
        )}
      </GlobalStateContext.Consumer>
    );
  }
}
