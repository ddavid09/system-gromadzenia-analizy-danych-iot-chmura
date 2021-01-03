import { makeObservable, observable } from "mobx";
import { RootStore } from "./RootStore";

export default class StoredDataStore {
    rootStore: RootStore

    constructor(rootStore: RootStore){
        makeObservable(this)
        this.rootStore = rootStore;
    }

    @observable TableValuesRegistry = new Map();
}