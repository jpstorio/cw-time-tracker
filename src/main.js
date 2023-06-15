import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCalendarWeek, BiCalendar3, CoAccountLogout } from "oh-vue-icons/icons";
import moment from "moment/moment";

const app = createApp(App);

addIcons(BiCalendarWeek, BiCalendar3, CoAccountLogout);
app.component("v-icon", OhVueIcon);

app.use(createPinia());
app.use(router);
app.use(moment);

app.mount("#app");
