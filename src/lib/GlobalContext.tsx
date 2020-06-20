import React, { createContext, Component } from "react";
import TransportService from "./TransportService";
import iPosition from "../interfaces/iPosition";

export const GlobalStateContext = createContext<IGlobalState | null>(null);

export interface IGlobalState {
  current: iPosition;
  zoom: number;
  positions: iPosition[];
}

/* provides global application state */
export default class GlobalStateContextProvider extends Component<
  {},
  IGlobalState
> {
  private readonly _issTrackerApi: string =
    "http://api.open-notify.org/iss-now.json";
  private readonly _pollingInterval: number = 5000;
  private transportService: TransportService;

  constructor(props: {}) {
    super(props);

    this.state = {
      current: undefined,
      zoom: 7,
      positions: [],
    };

    this.transportService = new TransportService();
    this.startTracking();
  }

  private async startTracking() {
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
      alert("Error retrieving ISS tracking data.");
    }
  }

  private updateTrackingData(json: any) {
    const { message, timestamp, iss_position } = json;
    const jsonIsValid: boolean =
      message === "success" &&
      timestamp &&
      iss_position &&
      iss_position.latitude &&
      iss_position.longitude;
    if (jsonIsValid) {
      const positionIsNew: boolean =
        this.state.positions.length === 0 ||
        timestamp >
          this.state.positions[this.state.positions.length - 1].timestamp;
      if (positionIsNew) {
        try {
          const newPosition: iPosition = {
            lat: Number.parseFloat(iss_position.latitude),
            lng: Number.parseFloat(iss_position.longitude),
            timestamp: timestamp,
          };
          this.updateState(newPosition);
        } catch {
          console.error("failed to track ISS position", {
            message,
            timestamp,
            iss_position,
          });
        }
      }
    }
  }

  private updateState(newPosition: iPosition) {
    // please note that data must be kept immutable in react (eg required for reconciliation/ re-rendering.)
    if (this.state.current) {
      this.setState({
        positions: [...this.state.positions, this.state.current],
        current: newPosition,
      });
    } else {
      this.setState({ current: newPosition });
    }
  }

  render() {
    return (
      <GlobalStateContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}
