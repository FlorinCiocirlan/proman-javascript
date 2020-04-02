import {dataHandler} from "./data_handler2.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        })
    },
    showBoards: function (boards) {
        let boardList = '';

        for (let board of boards) {
            boardList += `
            <section class="board">
                <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="btn btn-dark" id="buttonNewCardForBoard${board.id}">Add Card</button>            
                </div>
            </section>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('.container');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);


    }

}


