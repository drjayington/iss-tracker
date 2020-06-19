import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

type MapProps = {
  center: any;
  zoom: any;
};

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default class Map extends Component<MapProps> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  componentDidMount() {
    axios.get("http://api.open-notify.org/iss-now.json").then((res) => {
      console.log(res);
      //this.setState
      debugger;
    });
  }

  render() {
    const { center, zoom } = this.props;

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" /* YOUR KEY HERE */ }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}
