// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";



export let dom = {

    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <li>${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};


// --------------------------------------------------------

//
// let addBoard = document.getElementById('addNewBoard');
// addBoard.addEventListener('click', addNewBoard);
//
//
// let NameBoard = document.getElementById('nameBoard');
// NameBoard.addEventListener('click', editNameBoard);


export let addNewBoard = function () {

    console.log('dsad');

    const divRow = document.createElement('div');
    divRow.classList.add('row2', 'row', 'd-flex');
    document.querySelector('.container').appendChild(divRow);

    const divCol1 = document.createElement('div');
    divCol1.classList.add('col-2');
    divRow.appendChild(divCol1);

    const nameBoard = document.createElement('h4');
    nameBoard.setAttribute('id', 'nameBoard');
    nameBoard.setAttribute('contenteditable', 'true');
    nameBoard.textContent = 'Test Board 1';
    divCol1.appendChild(nameBoard);

    const divCol2 = document.createElement('div');
    divCol2.classList.add('col-sm');
    divRow.appendChild(divCol2);

    const addColumn = document.createElement('button');
    addColumn.setAttribute('id', 'addColumn');
    addColumn.classList.add('btn', 'btn-outline-dark');
    addColumn.setAttribute('type', 'button');
    addColumn.textContent = '+ New Column';
    divCol2.appendChild(addColumn);

    const divCol3 = document.createElement('div');
    divCol3.classList.add('dropdown', 'd-flex', 'v-auto', 'ml-auto');
    divRow.appendChild(divCol3);

    const buttonDropDown = document.createElement('button');
    buttonDropDown.classList.add('btn', 'btn-outline-dark', 'dropdown-toggle');
    buttonDropDown.setAttribute('id', 'dropDown');
    buttonDropDown.setAttribute('type', 'button');
    divCol3.appendChild(buttonDropDown);

}




function editNameBoard() {
    console.log('dasf');
}

