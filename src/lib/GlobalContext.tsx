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
    };

    this.startTracking();
  }

  private async startTracking() {
    if (!this.transportService) {
      this.transportService = new TransportService();
    }

    try {
      const json = await this.transportService.getData(this._issTrackerApi);
      this.updateTrackingData(json);

      this.transportService.pollData(
        this._issTrackerApi,
        (json: any) => {
          this.updateTrackingData(json);
        },
        this._pollingInterval
      );
    } catch {
      alert("Error getting ISS tracking data");
    }
  }

  private updateTrackingData(json: any) {
    console.warn(json);
  }

  render() {
    return (
      <GlobalStateContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}
