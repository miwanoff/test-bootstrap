import basket from "./modules/basket";
import goods from "./modules/goods";

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import scroll from "./modules/scroll";

import "../css/style.css";
import "../css/basket.css";
import "../css/goods.css";
import "../css/scroll.css";

window.addEventListener("DOMContentLoaded", function () {
  basket();
  goods();
  scroll();
});
