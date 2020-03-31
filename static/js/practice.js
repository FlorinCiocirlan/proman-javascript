let sampleData = {
    "statuses": [
        {
            "id": 1,
            "name": "New"
        },
        {
            "id": 2,
            "name": "In progress"
        },
        {
            "id": 3,
            "name": "Testing"
        },
        {
            "id": 4,
            "name": "Done"
        }
    ],
    "boards": [
        {
            "id": 1,
            "title": "Test Board 1",
            "is_active": true
        },
        {
            "id": 2,
            "title": "Test Board 2",
            "is_active": true
        }
    ],
    "cards": [
        {
            "id": 1,
            "title": "task1",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 2,
            "title": "task2",
            "board_id": 1,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 3,
            "title": "task3",
            "board_id": 1,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 4,
            "title": "task4",
            "board_id": 2,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 5,
            "title": "task5",
            "board_id": 2,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 6,
            "title": "task6",
            "board_id": 2,
            "status_id": 3,
            "order": 1
        }
    ]
};






let addBoard = document.getElementById('addNewBoard');
addBoard.addEventListener('click', addNewBoard);


let NameBoard = document.getElementById('nameBoard');
NameBoard.addEventListener('click', editNameBoard);


function addNewBoard() {
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