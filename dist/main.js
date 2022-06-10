/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((module) => {

eval("const fetchUsers = async() => {\n    const response = await fetch('/api/users');\n    return response.json();\n};\n\nconst fetchRestaurants = async() => {\n    const response = await fetch('/api/restaurants');\n    return response.json();\n};\n\nconst fetchReservations = async(id) => {\n    const response = await fetch(`/api/users/${id}/reservations`);\n    return response.json();\n};\n\nmodule.exports = {\n    fetchUsers,\n    fetchRestaurants,\n    fetchReservations\n}\n\n//# sourceURL=webpack://acme_reservation_planner/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const api = __webpack_require__(/*! ./api */ \"./src/api.js\");\nconst {fetchUsers, fetchRestaurants, fetchReservations} = api\n\nconst usersList = document.querySelector('#users-list')\nconst restaurantsList = document.querySelector('#restaurants-list')\nconst reservationsList = document.querySelector('#reservations-list')\n\nlet users;\nlet restaurants;\n\nrestaurantsList.addEventListener('click', async(e)=> {\n    if(e.target.tagName === 'LI'){\n      const restaurantId = e.target.getAttribute('data-id');\n      const userId = window.location.hash.slice(1); \n      const url = `/api/users/${userId}/reservations`;\n      await fetch(url, {\n        method: 'POST',\n        body: JSON.stringify({ restaurantId }),\n        headers: {\n          'Content-Type': 'application/json'\n        }\n      });\n      renderReservations();\n    }\n  });\n\nconst bootstrap = async() => {\n    const results = await Promise.all([\n        fetchUsers(),\n        fetchRestaurants()\n    ]);\n\n    users = results[0];\n    restaurants = results[1];\n    renderUsers();\n    html = restaurants.map(restaurants => {\n        return `\n        <li data-id='${restaurants.id}'>\n            ${restaurants.name} ${restaurants.id}\n        </li>\n       `;\n    }).join('')\n    restaurantsList.innerHTML = html\n    renderReservations();\n};\n\nconst renderReservations = async() => {\n    const hash = window.location.hash.slice(1);\n    if(hash) {\n            const reservations = await fetchReservations(hash);\n            const html = reservations.map(reservation =>  {\n            const restaurant = restaurants.find(restaurant => restaurant.id === reservation.restaurantId)\n            console.log(restaurant)\n            return `\n                <li>\n                    ${restaurant.name}\n                </li>\n            `\n        }).join('')\n        reservationsList.innerHTML = html\n    }\n    else {\n        window.location.hash = users[0].id\n    }\n};\n\nconst renderUsers = ()=> {\n    const hash = window.location.hash.slice(1);\n    let html = users.map( user => {\n      return `\n        <li ${ hash*1 === user.id ? \"class='selected'\":''}>\n          <a href='#${user.id}'>\n            ${ user.name }\n          </a>\n        </li>\n      `;\n    }).join('');\n    usersList.innerHTML = html;\n  };\n\n\nwindow.addEventListener('hashchange', () => {\n    renderReservations();\n    renderUsers();\n});\nbootstrap()\n\n\n\n//# sourceURL=webpack://acme_reservation_planner/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;