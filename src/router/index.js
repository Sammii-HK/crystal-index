import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Auth/Login") 
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About"),
  },
  {
    path: "/crystal-create",
    name: "Crystal Create Form",
    component: () => import("../views/CrystalCreateForm"),
    meta: { requiresAuth: true },
  },
  {
    path: '/crystals/:id/',
    name: "View Crystal",
    component: () => import("../views/CrystalView") 
  },
  {
    path: '/crystals/:id/update',
    name: "Update Crystal",
    component: () => import("../views/CrystalUpdate"),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.authUser?.id) {
      next({
        path: '/login',
      })
    } else next()
  } else next() // make sure to always call next()!
})

export default router;
