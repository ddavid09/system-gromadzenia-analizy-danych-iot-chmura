import { createContext } from "react";
import { AnalyseDataStore } from "./AnalyseDataStore";
import DeviceStore from "./DeviceStore";
import StoredDataStore from "./StoredDataStore";

export class RootStore {
  deviceStore: DeviceStore;
  storedDataStore: StoredDataStore;
  analyseDataStore: AnalyseDataStore;

  constructor() {
    this.deviceStore = new DeviceStore(this);
    this.storedDataStore = new StoredDataStore(this);
    this.analyseDataStore = new AnalyseDataStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
