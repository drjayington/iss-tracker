import React, { Component } from "react";
import "./ISSPosition.scss";

interface ISSPositionProps {
  lat: number;
  lng: number;
}

export default class ISSPosition extends Component<ISSPositionProps> {
  render() {
    return <div className="ISSPosition"> </div>;
  }
}
