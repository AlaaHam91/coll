const signin = () => import("../pages/signin.vue");
const signup = () => import("../pages/signup.vue");

export default [
  {
    path: "/auth/sign-in",
    name: "signin",
    component: signin,
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/auth/sign-up",
    name: "signup",
    component: signup,
    meta: {
      requireAuth: false
    }
  },
];
