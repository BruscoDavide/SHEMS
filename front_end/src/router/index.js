import Vue from "vue";
import VueRouter from "vue-router";
import Settings from "../views/Settings.vue";
import Scheduling from "../views/Scheduling.vue";
import Dashboard from "../views/UserApp.vue";
import Home from "../views/HomePage.vue";
import NewSchedule from "../views/NewSchedule.vue";
import activeDevices from "../views/activeDevices.vue";
import applianceRegister from "../views/applianceRegister.vue"
import newAppliance from "../views/newAppliance.vue"
import consumptionAppli from "../views/consumptionAppli.vue"
import Registration from "../views/Registration.vue";
import ComfortParameter2 from "../views/ComfortParameter2.vue";
import StorageSystem from '../views/StorageSystem.vue'
import EVregistration from "../views/EVregistration.vue";
import Summary2 from "../views/Summary2.vue";
import CommunityProsumers2 from "../views/CommunityProsumers2.vue";
import InitialApplianceRegistration from "../views/InitialApplianceRegistration.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Registration",
    component: Registration,
    meta: { requireAuth: false },
  },
  {
    path: "/comfort-parameters2",
    name: "comfortParameters2",
    component: ComfortParameter2,
    meta: { requireAuth: false },
  },
  {
    path: "/storage-system",
    name: "StorageSystem",
    component: StorageSystem,
    meta: { requireAuth: false },
  },
  {
    path: "/ev-registration2",
    name: "EVregistration",
    component: EVregistration,
    meta: { requireAuth: false },
  },
  {
    path: "/initial-appliance-registration",
    name: "InitialApplianceRegistration",
    component: InitialApplianceRegistration,
    meta: { requireAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requireAuth: true },
    children: [
      {
        path: "active-devices",
        component: activeDevices,
        name: "activeDevices",
        meta: { requireAuth: true },
      },
      {
        path: "scheduling",
        name: "scheduling",
        component: Scheduling,
        meta: { requireAuth: true },
      },
      {
        path: "new-schedule",
        name: "newSchedule",
        component: NewSchedule,
        meta: { requireAuth: true },
      },
      {
        path: "summary2",
        name: "summary2",
        component: Summary2,
        meta: { requireAuth: true },
      },
      {
        path: "home-resume",
        name: "home",
        component: Home,
        meta: { requireAuth: true },
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
        meta: { requireAuth: true },
      },
      {
        path: "appliance-register",
        name: "applianceRegister",
        component: applianceRegister,
        meta: { requireAuth: true },
      },
      {
        path: "new-appliance",
        name: "newAppliance",
        component: newAppliance,
        meta: { requireAuth: true },
      },
      {
        path: "consumption-appli",
        name: "consumptionAppli",
        component: consumptionAppli,
        meta: { requireAuth: true },
      },
      {
        path: "community-prosumers2",
        name: "CommunityProsumers2",
        component: CommunityProsumers2,
        meta: { requireAuth: true },
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "Registration" || to.name == "comfortParameters2" || to.name == "StorageSystem" || to.name == "EVregistration")   {
    if (localStorage.getItem("auth") == "true") {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    if (to.meta.requireAuth) {
      if (localStorage.getItem("auth") == "false") {
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
