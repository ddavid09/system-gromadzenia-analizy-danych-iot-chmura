import { action, makeObservable, observable } from "mobx";
import { DropdownProps } from "semantic-ui-react";
import { threadId } from "worker_threads";
import { RootStore } from "./RootStore";

export class AnalyseDataStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable analyseData = new Map();
  @observable filtersVisible: boolean = false;
  @observable filtersAvailable: boolean = true;
  @observable devicesIds:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | undefined = [];

  @action addDeviceId = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const { value } = data;
    this.devicesIds = value;
  };

  @action fetchTableData = async () => {};

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
