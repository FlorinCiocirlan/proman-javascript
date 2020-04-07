//*****************Show all boards *************

function displayBoards(boards){
    for(board of boards){
        const divBoard = document.createElement('div')
        divBoard.classList.add('bigDiv' + `${board.id}`)
        document.querySelector('.container').appendChild(divBoard);


        const divRow = document.createElement('div');
        divRow.classList.add(`row_${board.id}`, 'row', 'd-flex');
        divBoard.appendChild(divRow);

        const divCol1 = document.createElement('div');
        divCol1.classList.add('col-2');
        divRow.appendChild(divCol1);

        const nameBoard = document.createElement('h4');
        nameBoard.setAttribute('id', `boardName_${board.id}`);
        nameBoard.setAttribute('contenteditable', 'true');
        nameBoard.textContent = `${board.title}`;
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
        buttonDropDown.classList.add('btn', 'btn-outline-dark');
        buttonDropDown.setAttribute('type', 'button');
        buttonDropDown.setAttribute('onclick',"showStatuses("+`${board.id}`+")");
        divCol3.appendChild(buttonDropDown);
        getStatuses(board.id)

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


//*************** Drop Down *************
function createStatuses(statuses, boardId){
    content = document.querySelector('.bigDiv' + boardId)

    // divStatus = document.createElement('div');
    // divStatus.classList.add('collapse', 'bordContent');
    // divStatus.setAttribute('id', 'collapseBoard' + boardId)
    // divStatus.textContent = 'buan ziua'
    // content.append(divStatus)
    outerHTML = `<div class="container" id="container_${boardId}" style="display: none;"><div class="row" id="collapseBoard_${boardId}"> </div></div>`;
    content.insertAdjacentHTML('beforeend',outerHTML)
    statusList = ``
    for(currentStatus of statuses){
        column = `<div class="col">${currentStatus.title}</div>`;
        statusList += column;
    }
    document.querySelector('#collapseBoard_'+ boardId).insertAdjacentHTML('beforeend',statusList)

}


function getStatuses(boardId){
    fetch('/get-statuses')
        .then ((response)=>{
            return response.json();
        })
        .then((data) => {
            createStatuses(data, boardId)
        })
}

function showStatuses(boardId){
    let div = document.querySelector('#container_'+boardId);
    if (div.style.display === 'none'){
        div.style.display = 'block'
    } else{
        div.style.display = 'none';
    }
}

