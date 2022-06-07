import {createApp} from "vue"
import router from "./router"
import App from "./App.vue"
import "@popperjs/core"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./assets/style.css"

createApp(App).use(router).mount("#root")
