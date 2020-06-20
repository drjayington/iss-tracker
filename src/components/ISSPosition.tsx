import React, { Component } from "react";
import "./ISSPosition.scss";
import iss from "./../resources/iss_marker.png";

interface ISSPositionProps {
  lat: number;
  lng: number;
  isCurrent: boolean;
}

export default class ISSPosition extends Component<ISSPositionProps> {
  render() {
    const { isCurrent } = this.props;
    return (
      <>
        {isCurrent ? (
          <div className="CurrentISSPosition">
            <img
              className="ISSMapIcon"
              src={iss}
              alt="International Space Station"
            />
          </div>
        ) : (
          <div className="ISSPosition"> </div>
        )}
      </>
    );
  }
}
