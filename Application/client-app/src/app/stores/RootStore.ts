import { createContext } from "react";
import DeviceStore from "./DeviceStore";
import StoredDataStore from "./StoredDataStore";

export class RootStore {
  deviceStore: DeviceStore;
  storedDataStore: StoredDataStore;

  constructor() {
    this.deviceStore = new DeviceStore(this);
    this.storedDataStore = new StoredDataStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
