import {dataHandler} from "./data_handler2.js";

export let dom = {
    init: function () {

        dom.loadBoards();
        dom.loadCards();
    },
    loadBoards: function (callback) {
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            callback();
        })
    },
    showBoards: function (boards) {
        let boardList = [];

        for (let board of boards) {
            boardList.push(
        `<div class="row d-flex">
            <div class="col-2">
                <h4 id="nameBoard" contenteditable="true">${board.title}</h4>
            </div>
            <div class="col-sm">
                <button id="addColumn" class="btn btn-outline-dark" type="button">+ New Column</button>
            </div>
            <div class="dropdown d-flex v-auto ml-auto">
                <button id="dropdown" class="btn btn-outline-dark dropdown-toggle" type="button"></button>
            </div>
        </div>`
        );
        }



        let boardsContainer;
        for (let everyboard of boardList){
            boardsContainer = document.querySelector('.container');
            boardsContainer.insertAdjacentHTML("beforeend", everyboard);

        }


    },
    loadCards: function(boardId){
        dataHandler.getCards(function(cards){
            dom.showCards(cards);
            callback();
        })

    },
    showCards: function (cards) {
        let cardList = [];

        for (let card of cards) {
            cardList.push(
        `<div class="row d-flex">
            <div class="col-3">
                <p>${card.title}</p>
            </div>
        </div>`
        );
        }




        let cardsContainer;
        for (let everycard of cardList){
            cardsContainer = document.querySelector('.container');
            cardsContainer.insertAdjacentHTML("beforeend", everyboard);
    }

}}