import promise from "promise";
import api from "@/services/api/auth/auth.api";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  },

  getters: {
    isSignedIn(state) {
      return state.token !== null;
    },
  },

  mutations: {
    signin(state, data) {
      state.token = data.token;
    },
    signout(state) {
      state.token = null;
    },
  },

  actions: {
    signin({ commit }, credentials) {
      return new promise((resolve, reject) => {
        api
          .signin(credentials.email, credentials.password)
          .then((res) => {
            const token = res.data.message.token;
            localStorage.setItem("token", token);
            commit("signin", res.data.message);
            resolve();
          })
          .catch((err) => reject(err));
      });
    },
    signout({ getters, commit }) {
      if (getters.isSignedIn) {
        return new promise((resolve, reject) => {
          api
            .signout()
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            })
            .finally(() => {
              localStorage.removeItem("token");
              commit("signout");
            });
        });
      }
    },
  },
};
