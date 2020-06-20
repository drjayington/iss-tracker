import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GlobalStateContext, IGlobalState } from "./../lib/GlobalContext";
import ISSPosition from "./ISSPosition";
import iPosition from "../interfaces/iPosition";
import "./map.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

/* google map component */
export default class Map extends Component {
  private map;
  private maps;

  renderPolylines(current: iPosition, positions: iPosition[]) {
    if (this.map && this.maps) {
      const allPosition: iPosition[] = [...positions, current];

      let line = new this.maps.Polyline({
        path: allPosition,
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
      return (
        <ISSPosition
          key={pos.id}
          lat={pos.lat}
          lng={pos.lng}
          isCurrent={false}
        />
      );
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
          {this.renderPolylines(context.current, context.positions)}
          <ISSPosition
            key={context.current.id}
            lat={context.current.lat}
            lng={context.current.lng}
            isCurrent={true}
          />
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
