//*****************Show all boards *************

function displayBoards(boards){
    console.table(boards)
    for(board of boards){
        const divRow = document.createElement('div');
        divRow.classList.add(`row_${board.id}`, 'row', 'd-flex');
        document.querySelector('.container').appendChild(divRow);

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
        buttonDropDown.classList.add('btn', 'btn-outline-dark', 'dropdown-toggle');
        buttonDropDown.setAttribute('id', 'dropDown');
        buttonDropDown.setAttribute('type', 'button');
        buttonDropDown.
        divCol3.appendChild(buttonDropDown);

    }

}

function getAllBoards() {
    fetch('/get-boards')
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            displayBoards(data)
        })
}
getAllBoards()


//*************** Drop Down *************
function displayStatuses(){}


function getStatuses(){
    fetch('/get-statuses')
        .then ((response)=>{
            return response.json();
        })
        .then((data) => {
            displayStatus(data)
        })
}

