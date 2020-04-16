//*****************Show all boards *************



function displayBoards(boards){

    boardList = ``;

    for (board of boards){
        bordTemplate =
            `<div class="boardDiv_${board.id} mb-5 border">
                <div class="boardHeader_${board.id} d-flex mr-3 p-3 rounded  data-board="${board.id}">
                    <div id="boardTitle_${board.id} " class="mr-auto" >
                        <h3 contenteditable id="title_${board.id}">${board.title}</h3>
                    </div>
                    <div class="mr-auto">
                        <button id="addCard_${board.id}"  class="btn btn-outline-dark btn-sm" type="button">+ Add Card</button>
                    </div>
                     <div class="mr-2">
                        <button id="delete_${board.id}"  class="btn btn-outline-dark btn-sm" type="button">DELETE BOARD</button>
                    </div>
                    <div class="mr-2">
                        <button id="addStatus_${board.id}"  class="btn btn-outline-dark btn-sm" type="button">+ Add Status</button>
                    </div>
                    <div>
                        <button id="expandBoard_${board.id}" class="btn btn-outline-dark btn-sm" type="button" >v</button>
                    </div>
                </div>
                <div class="container border-top bg-light" style="display: none" id="container_${board.id}">
                    <div class="row" id="statusesContainer_${board.id}">
                        
                    </div>
                </div>
            </div>
            `

            boardList += bordTemplate;


    };


    let content = document.getElementById('content');
    content.insertAdjacentHTML('beforeend', boardList);

    //******************* add new board ***************
    let addBoardButton = document.getElementById('addNewBoard');
    let boardLength = boards.length
    addBoardButton.addEventListener('click', function(){addNewBoard(boardLength)});


    //*************** EDIT BOARD's TITLE ******************
    let contentEditable = document.querySelectorAll('h3');
    for (title of contentEditable) {
        title.addEventListener('keypress', editTitle);
    }
    // console.log(contentEditable);

    function editTitle(e){
        boardId = this.id.slice(6);
        boardId
        console.log(boardId)
        newTitle = this.textContent.trim();
        data = {boardId, newTitle}
        console.log(e.key);
        if (e.key === 'Enter' ){
            settings = {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(`/update-title-name/${boardId}`, settings)
            location.reload()
            }}

    //((((((((((*************

    // let statusTitleEditable = document.querySelectorAll('id')
    // for (statusTitle of statusTitleEditable){
    //     if(this.id.slice(0, 12)==='statusTitle_'){
    //     statuTitle.addEventListener('keypress' ,editStatusTitle);}
    // }
    //
    // function editStatusTitle(e){
    //     alert('fas')
    //     statusId = this.id.slice(12);
    //     console.log(statusId);
    //     newTitle = this.textContent.trim();
    //     data = {statusId, newTitle};
    //     console.log(e.key)
    //     if(e.key === 'Enter'){
    //        settings = {
    //             'method': 'POST',
    //             'headers': {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         }
    //         fetch(`/update-status-title/${statusId}`, settings)
    //         location.reload()
    //         }}



    //****************** BUTTONS *******************
    let buttons = document.getElementsByTagName('button');
    for (button of buttons) {
        if (button.id.slice(0, 12) === 'expandBoard_') {
            let boardId = button.id.slice(12);
            console.log(boardId)
            button.addEventListener('click', getStatuses);

            function getStatuses() {
                fetch('/get-statuses')
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        createStatus(data);
                    });

                let container = document.getElementById('container_'+`${boardId}`)
                if(container.style.display ==='none') {
                    container.style.display = 'block';
                }else{
                    container.style.display = 'none';
                }

                function createStatus(status) {
                    let expandBody = document.getElementById('statusesContainer_'+`${boardId}`);
                    expandBody.innerHTML = '';
                    for (stat of status) {
                        let boardBody = document.getElementById('statusesContainer_'+`${boardId}`)
                        // console.log(boardBody)
                        // console.log(stat.title)
                        boardBody.setAttribute('class', 'd-flex mr-3 p-3 rounded');
                        let column = document.createElement('div');

                        column.setAttribute('draggable', true)
                        column.setAttribute('class', 'col m-1 bg-white');
                        column.setAttribute('style', 'text-align: center')
                        column.setAttribute('id', `column_tr_`+`${stat.id}`+`_`+`${boardId}`);
                        column.setAttribute('data-board', `${boardId}`);
                        let statusTitle = document.createElement('div')
                        statusTitle.setAttribute('id', 'statulTitle_' + `${stat.id}`)
                        statusTitle.setAttribute('contenteditable', true)
                        statusTitle.innerText = `${stat.title}`;
                        column.appendChild(statusTitle)
                        // let delBtn = document.createElement('button')
                        // delBtn.innerText = 'X';
                        // column.appendChild(delBtn)
                        boardBody.appendChild(column);

                            fetch(`/get-cards/${boardId}/${stat.id}`)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((data) => {
                                    console.log(data)
                                    createCard(data);
                                });

                         function createCard(cards) {

                             for (card of cards){
                            let statusBody = document.getElementById(`column_tr_${card.status_id}_${card.board_id}`);
                            if (statusBody) {
                                let cardBody = document.createElement('div');
                                cardBody.setAttribute('draggable', true)
                                cardBody.setAttribute('class', 'col-md card');
                                cardBody.setAttribute('style', ' border: 1px solid black; margin: 3px;');
                                cardBody.setAttribute('draggable', true);
                                cardBody.setAttribute('id', `card_${card.id}`);
                                cardBody.setAttribute('data-card', `${statusBody.id}`);
                                cardBody.setAttribute('data-board', statusBody.dataset.board);
                                cardBody.setAttribute('data-order', card.position);
                                cardBody.innerText += `${card.title}`;
                                statusBody.appendChild(cardBody);
                            }
                            }
                        }

                    }
                }
                }

        } else if (button.id.slice(0, 7) === 'delete_') {
            let boardId = button.id.slice(7);
            document.getElementById(`delete_${boardId}`).addEventListener('click', deleteBoard);

        } else if (button.id.slice(0, 10) === 'addStatus_') {
            let boardId = button.id.slice(10);
            document.getElementById(`addStatus_${boardId}`).addEventListener('click', addNewStatus);
        } else if (button.id.slice(0, 8) === 'addCard_') {
            let boardId = button.id.slice(8);
            document.getElementById(`addCard_${boardId}`).addEventListener('click', addNewCard);
        }
    }
}
    //
    //
    //
    //
    //
    // //****************** button to expand **************
    // let buttons = document.getElementsByTagName('button')
    // for (button of buttons) {
    //     if (button.id.slice(0, 12) === 'expandBoard_') {
    //         let boardId = button.id.slice(12)
    //         // console.log(boardId);
    //         let deleteButtonBoard = document.getElementById(`delete_${boardId}`).addEventListener('click', deleteBoard);
    //         button.addEventListener('click', async function(){
    //             let response = await fetch('/get-statuses/'+`${boardId}`);
    //             response = await response.json();
    //             let container = document.getElementById('container_'+`${boardId}`)
    //             if(container.style.display ==='none') {
    //                 container.style.display = 'block';
    //             }else{
    //                 container.style.display = 'none';
    //             }
    //             let expandBody = document.getElementById('statusesContainer_'+`${boardId}`);
    //             expandBody.innerHTML = '';
    //
    //             for (let status of response){
    //                 // console.log(status);
    //                 createStatus(status);
    //                 let statusResponse = await fetch(`/get-cards/${boardId}/${status.status_id}`);
    //                 statusResponse = await statusResponse.json();
    //                 let statusBody = document.getElementById(`column_tr_${status.status_id}_${status.board_id}`);
    //                 statusBody.innerHTML = '';
    //                 statusBody.innerText = status.title;
    //                 for (let card of statusResponse){
    //                     console.log(card);
    //                     createCard(card);
    //                 }
    //
    //             }
    //         } )
    //     } else if (button.id.slice(0, 10) === 'addStatus_') {
    //         let boardId = button.id.slice(10);
    //         let addStatusButton = document.getElementById(`addStatus_${boardId}`).addEventListener('click', addNewStatus);
    //     }
    // }


function getAllBoards() {
    fetch('/get-boards')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            displayBoards(data)
        })
}
getAllBoards()


function addNewBoard(lengthOfBoards) {
    board_title = 'New Board(' + (parseInt(`${lengthOfBoards}`) + 1) + ')';
    if (board_title !== null) {
        settings = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(board_title)
        };
        fetch('/add-new-board', settings)
        location.reload();
    }
}

function deleteBoard() {
    board_id = this.id.slice(7);
    console.log(board_id)
    settings = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(board_id)
    };
    fetch(`/delete-board/${board_id}`, settings)
        location.reload();
}



function addNewStatus() {
    status_title = 'New Status';
    if (status_title !== null) {
        settings = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(status_title)
        };
        fetch('/add-new-status', settings)
        location.reload();
    }
}

function addNewCard() {
    boardId = this.id.slice(8)
    cardTitle = 'New Card'
    console.log(boardId)
    if (cardTitle !== null) {
        settings = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(boardId, cardTitle)
        };
        fetch(`/add-new-card/${boardId}`, settings)
        location.reload();
    }
}



