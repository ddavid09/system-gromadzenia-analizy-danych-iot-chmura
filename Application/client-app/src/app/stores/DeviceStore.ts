import { observable, action, makeObservable, computed } from "mobx";
import { createContext } from "react";
import { CardProps } from "semantic-ui-react";
import agent from "../api/agent";
import { IDevice } from "../modules/device";

class DeviceStore {
  @observable deviceRegistry = new Map();
  @observable selectedDevice: IDevice | undefined = undefined;
  @observable loadingInitial = false;
  @observable editVisible = false;
  @observable creating = false;
  @observable editing = false;
  @observable target = "";

  @computed get devicesArray(): IDevice[] {
    return Array.from(this.deviceRegistry.values());
  }

  @action loadDevices = async () => {
    this.loadingInitial = true;
    try {
      const devices = await agent.Devices.getAll();
      devices.forEach((d) => {
        this.deviceRegistry.set(d.deviceId, d);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingInitial = false;
    }
  };

  @action createDevice = async (device: IDevice) => {
    this.creating = true;
    this.editVisible = false;
    try {
      await agent.Devices.create(device);
      this.deviceRegistry.set(device.deviceId, device);
    } catch (error) {
      console.log(error);
    } finally {
      this.creating = false;
    }
  };

  @action editDevice = async (device: IDevice) => {
    this.editing = true;
    this.editVisible = false;
    try {
      await agent.Devices.update(device);
      this.deviceRegistry.set(device.deviceId, device);
      this.selectedDevice = device;
    } catch (error) {
      console.log(error);
    } finally {
      this.editing = false;
      this.target = "";
    }
  };

  @action deleteDevice = async (device: IDevice) => {
    this.editing = true;
    this.editVisible = false;
    try {
      await agent.Devices.delete(device.deviceId);
      this.deviceRegistry.delete(device.deviceId);
    } catch (error) {
    } finally {
      this.editing = false;
      this.target = "";
    }
  };

  @action openCreateForm = () => {
    this.editVisible = true;
    this.selectedDevice = undefined;
  };

  @action selectDevice = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: CardProps
  ) => {
    const { name } = data;
    this.target = name;
    this.selectedDevice = this.deviceRegistry.get(name);
    this.editVisible = true;
  };

  @action cancelForm = () => {
    this.editVisible = false;
    this.selectedDevice = undefined;
  };

  constructor() {
    makeObservable(this);
  }
}

export default createContext(new DeviceStore());
