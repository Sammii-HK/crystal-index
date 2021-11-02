import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    path: "/crystals-gallery",
    name: "Crystals Gallery",
    component: () => import("../views/CrystalsGallery") 
  },
  {
    path: "/crystal-create",
    name: "Crystal Create Form",
    component: () => import("../views/CrystalCreateForm") 
  },
  {
    path: '/crystals/:id/',
    name: "View Crystal",
    // component: () => import("../views/CrystalForm") 
    component: () => import("../views/CrystalView") 
  },
  {
    path: '/profile',
    name: "Profile",
    // component: () => import("../views/CrystalForm") 
    component: () => import("../views/Profile") 
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
