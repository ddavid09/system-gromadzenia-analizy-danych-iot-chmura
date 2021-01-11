import { createContext } from "react";
import { AnalyseDataStore } from "./AnalyseDataStore";
import DeviceStore from "./DeviceStore";
import StoredDataStore from "./StoredDataStore";
import UserStore from "./UserStore";

export class RootStore {
  deviceStore: DeviceStore;
  storedDataStore: StoredDataStore;
  analyseDataStore: AnalyseDataStore;
  userStore: UserStore;

  constructor() {
    this.deviceStore = new DeviceStore(this);
    this.storedDataStore = new StoredDataStore(this);
    this.analyseDataStore = new AnalyseDataStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
