import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GlobalStateContext, IGlobalState } from "./../lib/GlobalContext";
import ISSPosition from "./ISSPosition";
import iPosition from "../interfaces/iPosition";
import "./map.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Map extends Component {
  private map;
  private maps;
  private initialized: boolean = false;

  renderPolylines(positions: iPosition[]) {
    if (this.map && this.maps) {
      let line = new this.maps.Polyline({
        path: positions,
        geodesic: false,
        strokeColor: "#FF9F32",
        strokeOpacity: 0.7,
        strokeWeight: 5,
      });
      line.setMap(this.map);

      this.fitBounds(positions, this.map, this.maps);
    }
  }

  fitBounds(positions: iPosition[], map, maps) {
    if (!this.initialized) {
      this.initialized = true;
      var bounds = new maps.LatLngBounds();

      for (let position of positions) {
        bounds.extend(new maps.LatLng(position.lat, position.lng));
      }

      debugger;
      map.fitBounds(bounds);
    }
  }

  renderISSPositions = (positions: iPosition[]) => {
    return positions.map((pos) => {
      return <ISSPosition key={pos.lat} lat={pos.lat} lng={pos.lng} />;
    });
  };

  renderMap(context: IGlobalState) {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{
            lat: context.current.lat,
            lng: context.current.lng,
          }}
          defaultZoom={context.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => {
            this.map = map;
            this.maps = maps;
          }}
        >
          {this.renderISSPositions(context.positions)}
          {/*this.renderPolylines(context.positions)*/}
        </GoogleMapReact>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  render() {
    return (
      <GlobalStateContext.Consumer>
        {(context: IGlobalState) => (
          <>
            {context.current ? this.renderMap(context) : this.renderLoading()}
          </>
        )}
      </GlobalStateContext.Consumer>
    );
  }
}
