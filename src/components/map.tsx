import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GlobalStateContext } from "./../lib/GlobalContext";
import ISSPosition from "./ISSPosition";
import iPosition from "../interfaces/iPosition";

type MapProps = {
  center: any;
  zoom: any;
};

export default class Map extends Component<MapProps> {
  markers: iPosition[] = [
    { lat: 59.955413, lng: 30.337844, timestamp: 0 },
    { lat: 59.965563, lng: 30.337844, timestamp: 1 },
    { lat: 59.975663, lng: 30.337844, timestamp: 2 },
    { lat: 59.985763, lng: 30.337844, timestamp: 3 },
    { lat: 59.995763, lng: 30.337844, timestamp: 4 },
    { lat: 60, lng: 30.387844, timestamp: 5 },
  ];

  renderPolylines(map, maps) {
    // Example of rendering non geodesic polyline (straight line)
    let nonGeodesicPolyline = new maps.Polyline({
      path: this.markers,
      geodesic: false,
      strokeColor: "#FF9F32",
      strokeOpacity: 0.7,
      strokeWeight: 3,
    });
    nonGeodesicPolyline.setMap(map);

    this.fitBounds(this.markers, map, maps);
  }

  fitBounds(markers, map, maps) {
    var bounds = new maps.LatLngBounds();
    for (let marker of markers) {
      bounds.extend(new maps.LatLng(marker.lat, marker.lng));
    }
    map.fitBounds(bounds);
  }

  ISSPositions = () => {
    return this.markers.map((pos) => {
      return <ISSPosition key={pos.lat} lat={pos.lat} lng={pos.lng} />;
    });
  };

  render() {
    const { center, zoom } = this.props;

    return (
      <GlobalStateContext.Consumer>
        {(context: any) => (
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={center}
              defaultZoom={zoom}
              onGoogleApiLoaded={({ map, maps }) =>
                this.renderPolylines(map, maps)
              }
            >
              {this.ISSPositions()}
            </GoogleMapReact>
          </div>
        )}
      </GlobalStateContext.Consumer>
    );
  }
}
