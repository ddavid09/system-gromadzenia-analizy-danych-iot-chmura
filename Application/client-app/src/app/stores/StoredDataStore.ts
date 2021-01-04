import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { DropdownProps } from "semantic-ui-react";
import agent from "../api/agent";
import { ITableValue, ITableValueAnalisable } from "../modules/TableValue";
import { RootStore } from "./RootStore";

const LIMIT = 50;

export default class StoredDataStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable tableValuesArray: ITableValue[] = new Array<ITableValue>();
  @observable valuesCount: number = 0;
  @observable selectedDeviceId: string = "";
  @observable loadingValues: boolean = false;

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    return params;
  }

  @computed get dataToAnlyse(): ITableValueAnalisable[] {
    return this.tableValuesArray.map((value) => ({
      deviceId: value.partitionKey,
      humidity: value.humidity,
      pressure: value.pressure,
      temperature: value.temperature,
      sentTimestamp: new Date(value.sentTimestamp).toLocaleDateString("pl-PL"),
    }));
  }

  @action loadTableValues = async () => {
    if (this.selectedDeviceId !== "") {
      try {
        this.loadingValues = true;
        const tableValuesEnvelope = await agent.TableValues.get(
          this.selectedDeviceId,
          this.axiosParams
        );
        const { tableValues, valuesCount } = tableValuesEnvelope;
        runInAction(() => {
          this.tableValuesArray = tableValues;
          this.valuesCount = valuesCount;
        });
      } catch (error) {
        runInAction(() => {});
      } finally {
        runInAction(() => {
          this.loadingValues = false;
        });
      }
    }
  };

  @action setDeviceId = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const { value } = data;
    if (typeof value === "string") {
      this.selectedDeviceId = value;
    }
  };
}
