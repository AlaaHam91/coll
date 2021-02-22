import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import store from "@/store/index.js";
import auth from "./../views/auth/routes/index";
import recipe from "./../views/recipe/routes/index";
import home from "../views/Home";
const routes = [
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/",
    redirect: { name: "home" },
  },
  ...auth,
  ...recipe,
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.section) {
    if (to.meta.requireAuth && !store.getters["auth/isSignedIn"])
      return next({ name: "signin" });
  }
  return next();
});
export default router;
