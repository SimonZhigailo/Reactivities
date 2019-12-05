import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import { createContext } from "vm";
//имеет связки с activityStore и userStore, передавая себя как параметр в конструктор, следовательно они знают о rootStore и о друг друге через него и он знает о них обращения будут только через rootStore из других частей типа this.rootStore.activityStore
export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;

  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
