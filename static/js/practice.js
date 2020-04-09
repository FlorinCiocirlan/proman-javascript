//*****************Show all boards *************



function displayBoards(boards){

    boardList = ``;

    for (board of boards){
    bordTemplate =
        `<div class="boardDiv_${board.id} mb-5">
            <div class="boardHeader_${board.id} d-flex border mr-3 p-3 rounded">
                <div id="boardTitle_${board.id} " class="mr-auto">
                    ${board.title}
                </div>
                <div class="mr-2">
                    <button id="addStatus_${board.id}"  class="btn btn-outline-dark btn-sm " type="button">+ Add Status</button>
                </div>
                <div>
                    <button id="expandBoard_${board.id}" class="btn btn-outline-dark btn-sm" type="button">v</button>
                </div>
            </div>
            <div class="container" style="display: none" id="container_${board.id}">
                <div class="row" id="statusesContainer_${board.id}">
                    
                </div>
            </div>
        </div>
        `

        boardList += bordTemplate;

    };
    let content = document.getElementById('content');
    content.insertAdjacentHTML('beforeend', boardList);

    let buttons = document.getElementsByTagName('button')
    for (button of buttons) {
        if (button.id.slice(0, 12) === 'expandBoard_') {
            let boardId = button.id.slice(12)
            button.addEventListener('click', async function(){
                let response = await fetch('/get-statuses/'+`${boardId}`);
                response = await response.json();
                let container = document.getElementById('container_'+`${boardId}`)
                if(container.style.display ==='none') {
                    container.style.display = 'block';
                }else{
                    container.style.display = 'none';
                }

                let expandBody = document.getElementById('statusesContainer_'+`${boardId}`);
                expandBody.innerHTML = '';

                for (let status of response){
                    // console.log(status);
                    createAppend(status);
                    let statusResponse = await fetch(`/get-cards/${boardId}/${status.status_id}`);
                    statusResponse = await statusResponse.json();
                    let statusBody = document.getElementById(`column_tr_${status.status_id}`);
                    statusBody.innerHTML = '';
                    statusBody.innerText = status.title;
                    for (let card of statusResponse){
                        console.log(card);
                        createAppendCard(card);
                    }

                }
            } )
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

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function createAppend(status) {

    let boardBody = document.getElementById('statusesContainer_'+`${status.board_id}`)
    // boardBody.setAttribute('class', 'd-flex', 'border', 'mr-3', 'p-3', 'rounded');
    let column = document.createElement('div');
    column.setAttribute('class', 'col');
    // let column_tr = document.createElement('p');
    // column.setAttribute('class', 'col-sm');
    // column.setAttribute('style', 'margin:20px; border: 2px solid black; display: block');
    column.setAttribute('style', 'text-align: center')
    // column.setAttribute('style', 'display: table;')
    column.setAttribute('id', `column_${status.status_id}`);
    column.setAttribute('id', `column_tr_${status.status_id}`);
    column.setAttribute('data-board', status.board_id);
    column.innerText = `${status.title}`;
    boardBody.appendChild(column);}


function createAppendCard(status) {
    let statusBody = document.getElementById(`column_tr_${status.status_id}`);
    if (statusBody) {
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'col-md');
    cardBody.setAttribute('style', ' border: 2px solid black; margin: 6px;');
    cardBody.setAttribute('id', `card_${status.id}`);
    cardBody.setAttribute('data-card', `${statusBody.id}`);
    cardBody.setAttribute('data-board', statusBody.dataset.board);
    cardBody.setAttribute('data-order', status.position);
    cardBody.innerText += `${status.title}`;
    statusBody.appendChild(cardBody);
    }
}








// for(board of boards){
    //     const divBoard = document.createElement('div')
    //     divBoard.classList.add('bigDiv' + `${board.id}`)
    //     document.querySelector('.container').appendChild(divBoard);
    //
    //
    //     const divRow = document.createElement('div');
    //     divRow.classList.add(`row_${board.id}`, 'row', 'd-flex');
    //     divBoard.appendChild(divRow);
    //
    //     const divCol1 = document.createElement('div');
    //     divCol1.classList.add('col-2');
    //     divRow.appendChild(divCol1);
    //
    //     const nameBoard = document.createElement('h4');
    //     nameBoard.setAttribute('id', `boardName_${board.id}`);
    //     nameBoard.setAttribute('contenteditable', 'true');
    //     nameBoard.textContent = `${board.title}`;
    //     divCol1.appendChild(nameBoard);
    //
    //     const divCol2 = document.createElement('div');
    //     divCol2.classList.add('col-sm');
    //     divRow.appendChild(divCol2);
    //
    //     const addColumn = document.createElement('button');
    //     addColumn.setAttribute('id', 'addColumn');
    //     addColumn.classList.add('btn', 'btn-outline-dark');
    //     addColumn.setAttribute('type', 'button');
    //     addColumn.textContent = '+ New Column';
    //     divCol2.appendChild(addColumn);
    //
    //     const divCol3 = document.createElement('div');
    //     divCol3.classList.add('dropdown', 'd-flex', 'v-auto', 'ml-auto');
    //     divRow.appendChild(divCol3);
    //
    //     const buttonDropDown = document.createElement('button');
    //     buttonDropDown.classList.add('btn', 'btn-outline-dark');
    //     buttonDropDown.setAttribute('type', 'button');
    //     buttonDropDown.setAttribute('onclick',"showStatuses("+`${board.id}`+")");
    //     buttonDropDown.textContent = 'v';
    //     divCol3.appendChild(buttonDropDown);
    //
    //
    //




