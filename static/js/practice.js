//*****************Show all boards *************



function displayBoards(boards){

    boardList = ``;

    for (board of boards){
        bordTemplate =
            `<div class="boardDiv_${board.id} mb-5 border">
                <div class="boardHeader_${board.id} d-flex mr-3 p-3 rounded">
                    <div id="boardTitle_${board.id} " class="mr-auto" >
                        <h3 contenteditable id="title_${board.id}">${board.title}</h3ontenteditable>
                    </div>
                     <div class="mr-2">
                        <button id="delete_${board.id}"  class="btn btn-outline-dark btn-sm " type="button">DELETE BOARD</button>
                    </div>
                    <div class="mr-2">
                        <button id="addStatus_${board.id}"  class="btn btn-outline-dark btn-sm " type="button">+ Add Status</button>
                    </div>
                    <div>
                        <button id="expandBoard_${board.id}" class="btn btn-outline-dark btn-sm" type="button">v</button>
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


    let contentEditable = document.querySelectorAll('h3');
    for (title of contentEditable) {
        title.addEventListener('keypress', editTitle);
    }
    // console.log(contentEditable);

    function editTitle(e){
        boardId = this.id.slice(6);
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
                location.reload();
            }}


    //******************* add new board ***************
    let addBoardButton = document.getElementById('addNewBoard');
    let boardLength = boards.length
    addBoardButton.addEventListener('click', function(){addNewBoard(`${boardLength}`)});




    //****************** button to expand **************
    let buttons = document.getElementsByTagName('button')
    for (button of buttons) {
        if (button.id.slice(0, 12) === 'expandBoard_') {
            let boardId = button.id.slice(12)
            // console.log(boardId);
            let deleteButtonBoard = document.getElementById(`delete_${boardId}`).addEventListener('click', deleteBoard);
            button.addEventListener('click', async function() {
                let response = await fetch('/get-statuses/' + `${boardId}`);
                response = await response.json();
                let container = document.getElementById('container_' + `${boardId}`)
                if (container.style.display === 'none') {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
                let expandBody = document.getElementById('statusesContainer_' + `${boardId}`);
                expandBody.innerHTML = '';

                for (let status of response) {
                    // console.log(status);
                    createStatus(status);
                    let statusResponse = await fetch(`/get-cards/${boardId}/${status.status_id}`);
                    statusResponse = await statusResponse.json();
                    let statusBody = document.getElementById(`column_tr_${status.status_id}_${status.board_id}`);
                    statusBody.innerHTML = '';
                    statusBody.innerText = status.title;
                    for (let card of statusResponse) {
                        console.log(card);
                        createCard(card);
                    }

                }
            })
        }
    }
}


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




function createStatus(status) {

    let boardBody = document.getElementById('statusesContainer_'+`${status.board_id}`)
    boardBody.setAttribute('class', 'd-flex mr-3 p-3 rounded');
    let column = document.createElement('div');

    column.setAttribute('class', 'col m-1 bg-white listcard');
    column.setAttribute('class', 'col m-1 bg-white card_list');
    column.setAttribute('style', 'text-align: center')
    column.setAttribute('id', `column_tr_${status.status_id}_${status.board_id}`);
    column.setAttribute('data-board', status.board_id);
    column.innerText = `${status.title}`;
    boardBody.appendChild(column);}


function createCard(status) {
    let statusBody = document.getElementById(`column_tr_${status.status_id}_${status.board_id}`);
    if (statusBody) {
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'col-md card');
    cardBody.setAttribute('style', ' border: 1px solid black; margin: 3px;');
    cardBody.setAttribute('draggable', true);
    cardBody.setAttribute('id', `card_${status.id}`);
    cardBody.setAttribute('data-card', `${statusBody.id}`);
    cardBody.setAttribute('data-board', statusBody.dataset.board);
    cardBody.setAttribute('data-order', status.position);
    cardBody.innerText += `${status.title}`;
    statusBody.appendChild(cardBody);
    }
}


const list_items = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.card_list');


let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener('dragstart', function () {

        draggedItem = item;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0)
    });

    item.addEventListener('dragend', function () {
        setTimeout(function () {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    })

    for (let j = 0; j < lists.length; j++) {
        const list = lists[j];

        list.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });

        list.addEventListener('dragleave', function (e) {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        list.addEventListener('drop', function (e) {
            console.log('drop');
            this.append(draggedItem);
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
    }


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
            }
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
        }
        fetch(`/delete-board/${board_id}`, settings)
        location.reload();
    }
}




