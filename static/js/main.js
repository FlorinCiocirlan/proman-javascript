import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

    // add new board
    let addBoard = document.getElementById('addNewBoard');
    addBoard.addEventListener('click', addNewBoard);


    // let NameBoard = document.getElementById('nameBoard');
    // NameBoard.addEventListener('click', editNameBoard);

    // addNewBoard();

}

init();
