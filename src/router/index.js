import HomePage from "../view/Home.vue";
import CartPage from "../view/Cart.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Data from "../view/Data.vue";
import Sidebar from "../components/Sidebar.vue";
import Maber from "../kategori/Makananberat.vue";
import Menu from "../view/Menu.vue";
import Minuman from "../kategori/Minuman.vue";
import Obat from "../kategori/Obat.vue";
import Sembako from "../kategori/Sembako.vue";
import KeperluanAnak from "../kategori/KeperluanAnak.vue";
import Perlengkapan from "../kategori/Perlengkapan.vue";
import Kuota from "../kategori/Kuota.vue";
import Elektronik from "../kategori/Elektronik.vue";
import Mainan from "../kategori/Mainan.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  { path: "/data", component: Data },
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/sidebar",
    component: Sidebar,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/makananberat",
    component: Maber,
  },
  {
    path: "/menu",
    component: Menu,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/minuman",
    component: Minuman,
  },
  {
    path: "/obat",
    component: Obat,
  },
  {
    path: "/sembako",
    component: Sembako,
  },
  {
    path: "/keperluan",
    component: KeperluanAnak,
  },
  {
    path: "/perlengkapan",
    component: Perlengkapan,
  },
  {
    path: "/kuota",
    component: Kuota,
  },
  {
    path: "/elektronik",
    component: Elektronik,
  },
  {
    path: "/mainan",
    component: Mainan,
  },
];
const router = new Router({
  routes,
  mode: "history",
});

export default router;
