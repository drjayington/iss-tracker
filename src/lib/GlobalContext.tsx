import React, { createContext, Component } from "react";
import TransportService from "./TransportService";

export const GlobalStateContext = createContext<IGlobalState | null>(null);

export interface IGlobalState {
  current: {
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
  };
  startTracking: () => void;
}

/* provides global application state */
export default class GlobalStateContextProvider extends Component<
  {},
  IGlobalState
> {
  private readonly _issTrackerApi: string =
    "http://api.open-notify.org/iss-now.json";
  private readonly _pollingInterval: number = 5000;
  private transportService: TransportService | undefined;

  constructor(props: {}) {
    super(props);

    this.state = {
      current: {
        center: {
          lat: 79.95,
          lng: 50.33,
        },
        zoom: 11,
      },
      startTracking: this.startTracking,
    };
  }

  private startTracking() {
    if (!this.transportService) {
      this.transportService = new TransportService();
    }

    this.transportService.pollData(
      this._issTrackerApi,
      (json: any) => {},
      this._pollingInterval
    );
  }

  private updateTrackingData(json: any) {}

  render() {
    return (
      <GlobalStateContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}
