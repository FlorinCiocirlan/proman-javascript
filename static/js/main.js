import {dom} from "./dom.js";

let init = function () {
    console.log('sunt in main js');
    dom.init();
    dom.loadBoards();
};

init();
