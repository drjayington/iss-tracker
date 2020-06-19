import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GlobalStateContext } from "./../lib/GlobalContext";

type MapProps = {
  center: any;
  zoom: any;
};

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default class Map extends Component<MapProps> {
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
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        )}
      </GlobalStateContext.Consumer>
    );
  }
}
