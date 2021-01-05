import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { DropdownProps } from "semantic-ui-react";
import agent from "../api/agent";
import { ITableValue } from "../modules/TableValue";
import { RootStore } from "./RootStore";

const LIMIT = 1000;

export class AnalyseDataStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable analyseData: ITableValue[] = [];
  @observable filtersVisible: boolean = false;
  @observable filtersAvailable: boolean = true;
  @observable loadingValues = false;
  @observable devicesIds: string[] = new Array<string>();

  @computed get analysableSet() {
    return this.analyseData
      .map((element) => ({
        timestamp: new Date(element.sentTimestamp).toLocaleTimeString(),
        [`${element.partitionKey}_temperature`]: element.temperature,
        [`${element.partitionKey}_humidity`]: element.humidity,
        [`${element.partitionKey}_pressure`]: element.pressure,
      }))
      .reverse();
  }

  @action addDeviceId = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const { value } = data;
    this.devicesIds = value as string[];
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    return params;
  }

  @action fetchTableData = async () => {
    if (Array.isArray(this.devicesIds)) {
      if (this.devicesIds.length > 0) {
        this.loadingValues = true;
        try {
          this.analyseData = [];
          await Promise.all(
            this.devicesIds.map(async (deviceId) => {
              if (typeof deviceId === "string") {
                const tableValuesEnvelope = await agent.TableValues.get(deviceId, this.axiosParams);
                runInAction(() => {
                  const { tableValues } = tableValuesEnvelope;
                  this.analyseData.push(...tableValues);
                });
              }
            })
          );
        } catch (error) {
          runInAction(() => {});
        } finally {
          console.log(JSON.stringify(this.analysableSet));
          this.loadingValues = false;
        }
      }
    }
  };

  @action makeFiltersAvailable = () => {
    this.filtersAvailable = true;
  };

  @action makeFiltersUnavailable = () => {
    this.filtersAvailable = false;
  };

  @action makeFiltersVisible = () => {
    this.filtersVisible = true;
    this.filtersAvailable = false;
  };

  @action hideFilters = () => {
    this.filtersVisible = false;
    this.filtersAvailable = true;
  };
}
