/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/basket.js":
/*!**********************************!*\
  !*** ./src/js/modules/basket.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ basket)
/* harmony export */ });
function basket() {
  var d = document,
    itemBox = d.querySelectorAll(".item_box"), // блок каждого товара
    cartCont = d.getElementById("cart_content"); // блок вывода данных корзины
  // Функция кроссбраузерная установка обработчика событий
  function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
    } else {
      elem.attachEvent("on" + type, function () {
        handler.call(elem);
      });
    }
    return false;
  }
  // Получаем данные из LocalStorage
  function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));
  }
  // Записываем данные в LocalStorage
  function setCartData(o) {
    localStorage.setItem("cart", JSON.stringify(o));
    return false;
  }
  // Добавляем товар в корзину

  function count() {
    var count = 0;
    if (getCartData()) {
      var cartData = getCartData();
      console.log(cartData);
      for (var items in cartData) {
        //console.log(cartData[items][1]+" "+ cartData[items][2]);
        count += cartData[items][2];
      }
    }
    return count;
  }

  function addItem(plus) {
    if (getCartData()) {
      var cartData = getCartData();
      var item = plus.getAttribute("data-id");
      //console.log(cartData[item][2]);
      cartData[item][2] = Number(cartData[item][2]) + 1;
      console.log(cartData[item][2]);

      setCartData(cartData);
      cartCont.innerHTML = basketGenerate();
    }
  }

  function removeItem(plus) {
    if (getCartData()) {
      var cartData = getCartData();
      var item = plus.getAttribute("data-id");
      //console.log(cartData[item][2]);
      cartData[item][2] = Number(cartData[item][2]) - 1;
      console.log(cartData[item][2]);
      if (cartData[item][2] == 0) delete cartData[item];

      setCartData(cartData);
      cartCont.innerHTML = basketGenerate();
    }
  }

  function sum() {
    var sum = 0;
    if (getCartData()) {
      var cartData = getCartData();
      console.log(cartData);
      for (var items in cartData) {
        //console.log(cartData[items][1]+" "+ cartData[items][2]);
        sum += cartData[items][1] * cartData[items][2];
        console.log(sum);
      }
    }
    return sum;
  }

  function addToCart(e) {
    this.disabled = true; // блокируем кнопку на время операции с корзиной
    var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = this.parentNode.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
      itemId = this.getAttribute("data-id"), // ID товара
      itemTitle = parentBox.querySelector(".item_title").innerHTML, // название товара
      itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
    if (cartData.hasOwnProperty(itemId)) {
      // если такой товар уже в корзине, то добавляем +1 к его количеству
      cartData[itemId][2] += 1;
    } else {
      // если товара в корзине еще нет, то добавляем в объект
      cartData[itemId] = [itemTitle, itemPrice, 1];
    }
    // Обновляем данные в LocalStorage
    if (!setCartData(cartData)) {
      this.disabled = false; // разблокируем кнопку после обновления LS
      cartCont.innerHTML = "Товар добавлен в корзину.";
      setTimeout(function () {
        cartCont.innerHTML = "В корзине товаров: " + count();
      }, 1000);
    }
    return false;
  }
  // Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
  for (var i = 0; i < itemBox.length; i++) {
    addEvent(itemBox[i].querySelector(".add_item"), "click", addToCart);
  }

  function basketGenerate() {
    var cartData = getCartData(), // вытаскиваем все данные корзины
      totalItems = "";
    console.log(JSON.stringify(cartData));
    // если что-то в корзине уже есть, начинаем формировать данные для вывода
    if (cartData !== null) {
      totalItems =
        '<table class="shopping_list table-hover"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th>Добавить товар</th><th>Удалить товар</th></tr>';
      for (var items in cartData) {
        totalItems += "<tr>";
        for (var i = 0; i < cartData[items].length; i++) {
          totalItems += "<td>" + cartData[items][i] + "</td>";
        }
        totalItems +=
          "<td>" +
          '<span class="plus glyphicon glyphicon-plus" data-id="' +
          items +
          '" onclick="addItem(this)"></span>' +
          "</td>";

        totalItems +=
          "<td>" +
          '<span class="minus glyphicon glyphicon-minus" data-id="' +
          items +
          '" onclick="removeItem(this)"></span>' +
          "</td>";

        totalItems += "</tr>";
      }
      totalItems +=
        "<tr>" +
        "<td>" +
        "Сумма" +
        "</td>" +
        "<td>" +
        sum() +
        "</td>" +
        "<td>" +
        count() +
        "</td>" +
        "<td></td><td></td></tr>";
      totalItems += "<table>";
      return totalItems;
    } else {
      // если в корзине пусто, то сигнализируем об этом
      return "В корзине товаров: " + count();
    }
  }

  // Открываем корзину со списком добавленных товаров
  function openCart(e) {
    cartCont.innerHTML = basketGenerate();
    return false;
  }

  /* Открыть корзину */
  addEvent(d.getElementById("checkout"), "click", openCart);
  /* Очистить корзину */
  addEvent(d.getElementById("clear_cart"), "click", function (e) {
    localStorage.removeItem("cart");
    cartCont.innerHTML = "Корзина очишена.";
  });
  sum();
}


/***/ }),

/***/ "./src/js/modules/goods.js":
/*!*********************************!*\
  !*** ./src/js/modules/goods.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ goods)
/* harmony export */ });
function goods() {
  function loadBooks() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../../books.json", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState != 4) return;
      if (xhttp.status != 200) {
        alert(xhttp.status + ": " + xhr.statusText);
      } else {
        let books = JSON.parse(xhttp.responseText);
        insertBooks(books);
      }
    };
  }

  function insertBooks(books) {
    var str = `<div class="wrap">`;
    for (var i = 0; i < books.length; i++) {
      str +=
        `<div class="bookWrap col-sm-4 col-xs-12">` +
        `<div class="panel panel-default text-center">` +
        `<div class="panel-heading">`;
      str += `<h3>${books[i].name}</h3></div>`;
      str += `<div class="image"><img src="${books[i].imageCover}" /></div>`;

      str += `<p>${books[i].author}</p>`;
      str += `</div></div>`;
    }
    str += `</div>`;
    document.getElementById("books").innerHTML = str;
  }

  document.getElementById("load").addEventListener("click", loadBooks);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_basket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/basket */ "./src/js/modules/basket.js");
/* harmony import */ var _modules_goods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/goods */ "./src/js/modules/goods.js");


window.addEventListener("DOMContentLoaded", function () {
  (0,_modules_basket__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_goods__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map