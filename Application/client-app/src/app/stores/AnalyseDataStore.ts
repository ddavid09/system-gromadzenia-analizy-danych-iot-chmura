import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { DropdownProps } from "semantic-ui-react";
import agent from "../api/agent";
import { ITableValue, ITableValuesEnvelope } from "../modules/TableValue";
import { RootStore } from "./RootStore";

const LIMIT = 1000;

export class AnalyseDataStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable analyseData: ITableValue[] = [];
  @observable analyseDataMap = new Map<string, ITableValuesEnvelope>();
  @observable filtersVisible: boolean = false;
  @observable filtersAvailable: boolean = true;
  @observable loadingValues = false;
  @observable devicesIds: string[] = new Array<string>();

  @computed get analysableSet() {
    return this.analyseData
      .map((element) => ({
        timestamp: new Date(element.sentTimestamp).toLocaleTimeString(),
        deviceId: element.partitionKey,
        [`${element.partitionKey}_temperature`]: element.temperature,
        [`${element.partitionKey}_humidity`]: element.humidity,
        [`${element.partitionKey}_pressure`]: element.pressure,
      }))
      .reverse();
  }

  @computed get avgAnalysableSet() {
    let arrs: {
      deviceId: string;
      temperature_arr: number[];
      pressure_arr: number[];
      humidity_arr: number[];
    }[] = [];
    this.analyseDataMap.forEach((envelope, key) => {
      arrs.push({
        deviceId: key,
        temperature_arr: envelope.tableValues.map((v) => v.temperature),
        pressure_arr: envelope.tableValues.map((v) => v.pressure),
        humidity_arr: envelope.tableValues.map((v) => v.humidity),
      });
    });
    return arrs.map((arr) => ({
      deviceId: arr.deviceId,
      temperature_avg: arr.temperature_arr.reduce((a, b) => a + b, 0) / arr.temperature_arr.length,
      pressure_avg: arr.pressure_arr.reduce((a, b) => a + b, 0) / arr.pressure_arr.length,
      humidity_avg: arr.humidity_arr.reduce((a, b) => a + b, 0) / arr.humidity_arr.length,
    }));
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
          this.analyseDataMap = new Map();
          await Promise.all(
            this.devicesIds.map(async (deviceId) => {
              if (typeof deviceId === "string") {
                const tableValuesEnvelope = await agent.TableValues.get(deviceId, this.axiosParams);
                runInAction(() => {
                  const { tableValues } = tableValuesEnvelope;
                  this.analyseData.push(...tableValues);
                  this.analyseDataMap.set(deviceId, tableValuesEnvelope);
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
