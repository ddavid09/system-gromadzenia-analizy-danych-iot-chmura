import { AccountInfo } from "@azure/msal-browser";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { loginRequest, msalInstance } from "../auth/authConfig";
import { RootStore } from "./RootStore";

export default class UserStore {
  rootStore: RootStore;

  @observable userAccount: AccountInfo | null = null;
  @observable IDtoken: string = "";
  @observable accessToken: string = "";

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @computed get Logged(): boolean {
    return this.userAccount != null;
  }

  @action Login = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      runInAction(() => {
        this.IDtoken = loginResponse.idToken;
        this.accessToken = loginResponse.accessToken;
        this.userAccount = loginResponse.account;
        console.log("Zalogowano ");
      });
    } catch {
    } finally {
    }
  };
}
