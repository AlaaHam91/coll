const recipes = () => import("../pages/index.vue");
const recipe = () => import("../pages/show.vue");

export default [
  {
    path: "/recipes",
    name: "recipes",
    component: recipes,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: recipe,
    meta: {
      requireAuth: true
    }
  },
];
