//*****************Show all boards *************



function displayBoards(boards){

    boardList = ``;

    for (board of boards){
    bordTemplate =
        `<div class="boardDiv_${board.id} mb-5 border">
            <div class="boardHeader_${board.id} d-flex mr-3 p-3 rounded">
                <div id="boardTitle_${board.id} " class="mr-auto">
                    <h3>${board.title}</h3>
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
                    let statusBody = document.getElementById(`column_tr_${status.status_id}_${status.board_id}`);
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
    boardBody.setAttribute('class', 'd-flex mr-3 p-3 rounded');
    let column = document.createElement('div');
<<<<<<< HEAD
    column.setAttribute('class', 'col m-1 bg-white listcard');
=======
    column.setAttribute('class', 'col m-1 bg-white card_list');
    // let column_tr = document.createElement('p');
    // column.setAttribute('class', 'col-sm');
    // column.setAttribute('style', 'margin:20px; border: 2px solid black; display: block');
>>>>>>> f876dca2c9bc5b05e5046d6ac6a0b3a355ef9ac8
    column.setAttribute('style', 'text-align: center')
    column.setAttribute('id', `column_tr_${status.status_id}_${status.board_id}`);
    column.setAttribute('data-board', status.board_id);
    column.innerText = `${status.title}`;
    boardBody.appendChild(column);}


function createAppendCard(status) {
    let statusBody = document.getElementById(`column_tr_${status.status_id}_${status.board_id}`);
    if (statusBody) {
    let cardBody = document.createElement('div');
<<<<<<< HEAD
    cardBody.setAttribute('class', 'col-md card');
=======
    cardBody.setAttribute('class' , 'col-md card');
    cardBody.setAttribute('draggable',true)
>>>>>>> f876dca2c9bc5b05e5046d6ac6a0b3a355ef9ac8
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

<<<<<<< HEAD
const list_items = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.listcard');
=======
const list_items = document.querySelectorAll('.card);
const lists = document.querySelectorAll('.card_list');
>>>>>>> f876dca2c9bc5b05e5046d6ac6a0b3a355ef9ac8

let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	item.addEventListener('dragstart', function () {
<<<<<<< HEAD
=======
	    console.log('dragstart')
>>>>>>> f876dca2c9bc5b05e5046d6ac6a0b3a355ef9ac8
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

	for (let j = 0; j < lists.length; j ++) {
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




