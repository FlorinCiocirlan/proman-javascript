import {dataHandler} from "./data_handler2.js";

export let dom = {
    init: function () {
        dom.loadBoards()
    },
    loadBoards: function () {
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        })
    },
    showBoards: function (boards) {
        let boardList = [];

        for (let board of boards) {
            boardList.push( `
        <div class="d-flex m-3 ">
            <section style="width: 100%" class="d-flex flex-row">
                <div class="bg-info p-2 border rounded flex-grow-1">
                    <span class="">${board.title}</span>
                </div>
                <button class="btn btn-dark ml-auto" id="buttonNewCardForBoard${board.id}">Add Column</button>            
            </section>
        </div>
            `);
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer;
        for (let everyboard of boardList){
            boardsContainer = document.querySelector('.container');
            boardsContainer = document.querySelector('.container');
            boardsContainer.insertAdjacentHTML("beforeend", everyboard);
        }


    }

}


