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

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./messsage_store */ \"./src/messsage_store.js\");\n\nconst Compose = {\n    render: () => {\n        let div = document.createElement('div');\n        div.className = 'new-messages';\n        let p = document.createElement('p');\n        p.className = 'new-message-header';\n        p.innerHTML = 'New Message';\n        \n        let form = document.createElement('form');\n        form.className = 'compose-form';\n            // 3 inputs\n            let to = document.createElement('input');\n            to.name = 'to';\n            to.value = MessageStore.messageDraft.to\n            to.placeholder = 'Recepiant';\n            let subject = document.createElement('input');\n            subject.name = 'subject';\n            subject.value = MessageStore.messageDraft.subject\n            subject.placeholder = 'Subject'\n            let body = document.createElement('textarea');\n            body.name = 'body'\n            body.rows = 20;\n            body.innerHTML = MessageStore.messageDraft.body;\n            let button = document.createElement('button');\n            button.className = \"btn btn-primary submit-message\";\n            button.type ='submit'\n            button.innerHTML = 'Send';\n        \n        // addchild\n        form.appendChild(to);\n        form.appendChild(subject);\n        form.appendChild(body);\n        form.appendChild(button);\n        div.appendChild(p);\n        div.appendChild(form);\n        return div;\n    },\n\n    // I/O to update field\n    update: ()=>{\n        \n        let data =MessageStore.messageDraft.rendertoSend();\n        let handle = (e)=>{\n            e.preventDefault();\n            let field = e.target;\n            let fieldName = field.name;\n            let fieldValue = field.value;\n            data[fieldName] = fieldValue;\n            MessageStore.updateDraftField(data);\n            console.log(MessageStore.messageDraft);\n        };\n\n        \n\n        let form = document.querySelector(\".content\")\n        form.addEventListener('change',handle);\n    },\n    submit: ()=>{\n        let send =(e)=>{\n            e.preventDefault();\n            MessageStore.sendDraft();\n            window.location.hash = 'sent'\n        };\n        let form = document.querySelector(\".content\")\n        form.addEventListener('submit', send);\n    }\n  \n\n\n};\n\nmodule.exports = Compose;\n\n//# sourceURL=webpack://stvp_js_mail/./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./messsage_store */ \"./src/messsage_store.js\");\n\n\n\nconst Inbox = {\n    render: ()=>{\n        let ul = document.createElement('ul');\n        ul.className = 'messages';\n\n        // get the messages\n        let allmessages = MessageStore.getInboxMessages();\n        // from subject body\n        \n        allmessages.forEach((message)=>{\n            let li = document.createElement('li');\n            li.className = 'message'\n            let from = document.createElement('span');\n            from.className = 'from';\n            let subject = document.createElement('span');\n            subject.className = 'subject';\n            let body = document.createElement('span');\n            body.className = 'body';\n            \n            from.innerHTML = message.from;\n            subject.innerHTML = message.subject + \"\\t\\t\";\n            body.innerHTML = message.body;\n\n            li.appendChild(from);\n            li.appendChild(subject);\n            li.append(body)\n            ul.appendChild(li)\n\n        })\n\n        // ul.innerHTML = 'An Inbox Message';\n\n\n        return ul;\n    },\n\n\n\n};\n\n\n\nmodule.exports = Inbox;\n\n//# sourceURL=webpack://stvp_js_mail/./src/inbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Compose = __webpack_require__(/*! ./compose */ \"./src/compose.js\");\nconst Inbox = __webpack_require__(/*! ./inbox */ \"./src/inbox.js\");\nconst Router = __webpack_require__(/*! ./router */ \"./src/router.js\");\nconst Sent = __webpack_require__(/*! ./sent */ \"./src/sent.js\");\n\n\n//created the routes\nvar routes = {\n    inbox: Inbox,\n    compose: Compose,\n    sent: Sent\n\n}\n\ndocument.addEventListener(\"DOMContentLoaded\",()=>{\n\n    //pharse I: chaning hash fragment\n\n    const innerText = (e) =>{\n        e.preventDefault();\n        const text = e.target.innerText.toLowerCase();\n        window.location.hash = text;\n    }\n\n    document.querySelectorAll(\".sidebar li\").forEach((li)=>{\n        li.addEventListener(\"click\",innerText);\n    })\n    \n    /// change the sub\n    let node = document.querySelector(\".content\");\n    new Router(node,routes);\n\n    Compose.update();\n    Compose.submit();\n})\n\n\n//# sourceURL=webpack://stvp_js_mail/./src/index.js?");

/***/ }),

/***/ "./src/messsage_store.js":
/*!*******************************!*\
  !*** ./src/messsage_store.js ***!
  \*******************************/
/***/ ((module) => {

eval("let messages = {\n    sent: [\n        {\n            to: \"friend@mail.com\",\n            subject: \"Check this out\",\n            body: \"It's so cool\"\n        },\n        { to: \"person@mail.com\", subject: \"zzz\", body: \"so booring\" }\n    ],\n    inbox: [\n        {\n            from: \"grandma@mail.com\",\n            subject: \"Fwd: Fwd: Fwd: Check this out\",\n            body:\n                \"Stay at home mom discovers cure for leg cramps. Doctors hate her\"\n        },\n        {\n            from: \"person@mail.com\",\n            subject: \"Questionnaire\",\n            body: \"Take this free quiz win $1000 dollars\"\n        }\n    ]\n};\n\nclass Messagge {\n    constructor(){\n        this.from = '';\n        this.to = '';\n        this.subject = '';\n        this.body = '';\n    }\n    rendertoSend(){\n        return {\n            to: this.to,\n            subject: this.subject,\n            body: this.body\n        }\n    }\n\n}\n\nlet MessageStore = {\n    getInboxMessages: ()=>{\n        return messages.inbox;\n    },\n    getSentMessages: ()=>{\n        return messages.sent;\n    },\n    messageDraft: new Messagge(),\n    updateDraftField:(data)=>{\n        MessageStore.messageDraft.from = data.from;\n        MessageStore.messageDraft.to = data.to;\n        MessageStore.messageDraft.subject = data.subject;\n        MessageStore.messageDraft.body = data.body;\n\n    },\n    sendDraft: ()=>{ // save draft to the database and reset draft\n        messages.sent.push(MessageStore.messageDraft.rendertoSend());\n        MessageStore.messageDraft = new Messagge;\n\n    }\n\n}\n\nmodule.exports = MessageStore;\n\n//# sourceURL=webpack://stvp_js_mail/./src/messsage_store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Compose = __webpack_require__(/*! ./compose */ \"./src/compose.js\");\nconst MessageStore = __webpack_require__(/*! ./messsage_store */ \"./src/messsage_store.js\");\n\n\n\nclass Router{\n    constructor(node,routes){\n        this.node = node;\n        this.routes = routes;\n        this.start();\n\n    }\n    start(){\n        this.render();\n        window.addEventListener('hashchange',()=>{\n            this.render();\n        })\n    }\n    activeRoute(){\n        let data = window.location.hash\n        return this.routes[data.slice(1)];\n\n    }\n    render(){\n        let component = this.activeRoute();\n        if (component === undefined){ \n            this.node.innerHTML = ''}else{\n            this.node.innerHTML = '';\n            let content = component.render();\n            this.node.appendChild(content);\n        };\n\n    }\n}\n\nmodule.exports = Router;\n\n//# sourceURL=webpack://stvp_js_mail/./src/router.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./messsage_store */ \"./src/messsage_store.js\");\n\n\nconst Sent = {\n    render: () => {\n        let ul = document.createElement('ul');\n        ul.className = 'messages';\n\n        //\n        let allmessages = MessageStore.getSentMessages();\n        // from subject body\n\n        allmessages.forEach((message) => {\n            let li = document.createElement('li');\n            li.className = 'message'\n            let to = document.createElement('span');\n            to.className = 'to';\n            let subject = document.createElement('span');\n            subject.className = 'subject';\n            let body = document.createElement('span');\n            body.className = 'body';\n\n            to.innerHTML = message.to;\n            subject.innerHTML = message.subject + \"\\t\\t\";\n            body.innerHTML = message.body;\n\n            li.appendChild(to);\n            li.appendChild(subject);\n            li.append(body)\n            ul.appendChild(li)\n\n        })\n        //\n\n        return ul;\n    },\n\n\n\n};\n\nmodule.exports = Sent;\n\n//# sourceURL=webpack://stvp_js_mail/./src/sent.js?");

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