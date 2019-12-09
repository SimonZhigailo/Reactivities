import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    //реакция в конструкторе при изменении токена, если есть, ставим его, если нет, удаляем из браузера
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable appLoaded = false;

  //сохранение токена в браузере
  @action setToken = (token: string | null) => {
    //после того как меняем токен, запускается реакция сверху
    this.token = token;
  };
  //триггер что приложение прогрузилось
  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
