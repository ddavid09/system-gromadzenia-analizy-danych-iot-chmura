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
  @observable minDate: Date | undefined;
  @observable maxDate: Date | undefined;

  @computed get analysableSet() {
    return this.analyseData
      .map((element) => ({
        timestampid: new Date(element.sentTimestamp),
        timestamp: new Date(element.sentTimestamp).toLocaleTimeString(),
        deviceId: element.partitionKey,
        [`${element.partitionKey}_temperature`]: element.temperature?.toFixed(3) ?? 0,
        [`${element.partitionKey}_humidity`]: element.humidity?.toFixed(3) ?? 0,
        [`${element.partitionKey}_pressure`]: element.pressure?.toFixed(3) ?? 0,
      }))
      .sort((a, b) => {
        return a.timestampid.getTime() - b.timestampid.getTime();
      });
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
      temperature_avg: (
        arr.temperature_arr.reduce((a, b) => a + b, 0) / arr.temperature_arr.length
      ).toFixed(3),
      pressure_avg: (arr.pressure_arr.reduce((a, b) => a + b, 0) / arr.pressure_arr.length).toFixed(
        3
      ),
      humidity_avg: (arr.humidity_arr.reduce((a, b) => a + b, 0) / arr.humidity_arr.length).toFixed(
        3
      ),
    }));
  }

  @computed get minMaxAnalysableSet() {
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
    let oneArr = arrs.map((arr) => ({
      deviceId: arr.deviceId,
      temperature_max: Math.max(...arr.temperature_arr),
      temperature_min: Math.min(...arr.temperature_arr),
      pressure_max: Math.max(...arr.pressure_arr),
      pressure_min: Math.min(...arr.pressure_arr),
      humidity_max: Math.max(...arr.humidity_arr),
      humidity_min: Math.min(...arr.humidity_arr),
    }));
    let retMap = new Map<string, typeof oneArr[0]>();
    oneArr.forEach((element) => {
      retMap.set(element.deviceId, element);
    });
    return retMap;
  }

  @action addDeviceId = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const { value } = data;
    this.devicesIds = value as string[];
    this.fetchTableData();
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    if (this.minDate) {
      params.append("minDate", this.minDate.toISOString());
    }
    if (this.maxDate) {
      params.append("maxDate", this.maxDate.toISOString());
    }
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
                  if (tableValuesEnvelope.valuesCount > 0) {
                    this.analyseData.push(...tableValues);
                    this.analyseDataMap.set(deviceId, tableValuesEnvelope);
                  }
                });
              }
            })
          );
        } catch (error) {
          runInAction(() => {});
        } finally {
          runInAction(() => {
            this.loadingValues = false;
          });
        }
      } else {
        this.analyseData = [];
        this.analyseDataMap = new Map();
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

  @action setMinDate = (date: Date | undefined) => {
    this.minDate = date;
  };

  @action setMaxDate = (date: Date | undefined) => {
    this.maxDate = date;
  };
}
