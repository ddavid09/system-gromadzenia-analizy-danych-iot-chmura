import { action, computed, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { ITableValue } from "../modules/TableValue";
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
