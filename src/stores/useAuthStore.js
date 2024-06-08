import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    loggedIn: localStorage.getItem("loggedIn") ? true : false,
    user: null,
  }),
  getters: {
    //
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
