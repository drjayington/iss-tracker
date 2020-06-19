/* class responsible for communicating with the backend */
export default class TransportService {
  private readonly pollTime: number = 5500;
  private timeOutHandle: any;

  constructor() {
    this.getData.bind(this);
  }

  public async getData(url: string) {
    let response: Response = await fetch(url);
    const json = await response.json();
    return json;
  }

  public async pollData(
    url: string,
    callback: (json: any) => any,
    pollTime: number = this.pollTime
  ) {
    this.stopPolling();
    this.timeOutHandle = setInterval(async () => {
      const json = await this.getData(url);
      callback(json);
    }, pollTime);
  }

  public stopPolling() {
    if (this.timeOutHandle) {
      clearInterval(this.timeOutHandle);
    }
  }
}
