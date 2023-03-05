import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "@/assets/theme/index.scss";
import "normalize.css/normalize.css";
import "animate.css";

const app = createApp(App);

app.use(router);
app.mount("#app");
