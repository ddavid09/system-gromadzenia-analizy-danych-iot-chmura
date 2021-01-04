import { action, computed, makeObservable, observable, runInAction } from "mobx";
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
    try {
      console.log("loading table values");
      const tableValuesEnvelope = await agent.TableValues.get("Develop1", this.axiosParams);
      const { tableValues, valuesCount } = tableValuesEnvelope;
      runInAction(() => {
        this.tableValuesArray = tableValues;
        this.valuesCount = valuesCount;
      });
    } catch (error) {
      runInAction(() => {});
    }
  };
}
