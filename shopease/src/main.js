import "./style.css";
import { router } from "./router";
import { getTheme, applyTheme } from "./utils/theme";

const theme = getTheme();
applyTheme(theme);

router();

window.addEventListener("hashchange", router);
