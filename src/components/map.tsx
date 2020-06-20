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

  renderPolylines(positions: iPosition[]) {
    if (this.map && this.maps) {
      let line = new this.maps.Polyline({
        path: positions,
        geodesic: false,
        strokeColor: "#FF9F32",
        strokeOpacity: 0.8,
        strokeWeight: 5,
      });
      line.setMap(this.map);
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
          {this.renderPolylines(context.positions)}
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
