import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../common/views/Home";
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
    component: () => import("../common/components/Auth/Login") 
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../common/views/About"),
  },
  {
    path: "/crystal-create",
    name: "Crystal Create Form",
    component: () => import("../common/views/CrystalCreateForm"),
    meta: { requiresAuth: true },
  },
  {
    path: '/crystals/:id/',
    name: "View Crystal",
    component: () => import("../common/views/CrystalView") 
  },
  {
    path: '/crystals/:id/update',
    name: "Update Crystal",
    component: () => import("../common/views/CrystalUpdate"),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/:id',
    name: "Profile",
    component: () => import("../common/views/Profile"),
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
    if (!store.authUser || !store.authUser.id) {
      // next({ path: '/login' })
      next()
    } else next()
  } else next() // make sure to always call next()!
})

export default router;
