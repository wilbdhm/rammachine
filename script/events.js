const INSTRUCTIONS = Object.freeze([
    'load', 'store', 'read', 'write',
    'add', 'sub', 'mult', 'div', 'mod',
    'jump', 'jzero', 'jgtz', 'halt'
]);
const ACCEPTABLE_VALUE_REGEX = /^([=^]?)(-?\d+)$/g;
const ACCEPTABLE_LABEL_REGEX = /^[\dA-Z_]+$/g;

document.getElementById('addRowButton').addEventListener('click', function () {
    let tbody = document.getElementById('programTableBody'),
        row = document.createElement('tr'),
        labelCell = document.createElement('td'),
        instructionCell = document.createElement('td'),
        valueCell = document.createElement('td'),
        deleteCell = document.createElement('td');

    labelCell.className = 'labelCell';
    instructionCell.className = 'instructionCell';
    valueCell.className = 'valueCell';
    // -----------
    let labelInput = document.createElement('input');
    labelInput.className = 'labelInput';
    labelInput.addEventListener('input', function() {
        if (labelInput.value == '' || labelInput.value.match(ACCEPTABLE_LABEL_REGEX))
            labelInput.className = 'labelInput';
        else
            labelInput.className = 'incorrectField';
    }, false);
    labelCell.appendChild(labelInput);
    
    let valueInput = document.createElement('input');
    valueInput.className = 'valueInput';
    valueInput.addEventListener('input', function() {
        if (valueInput.value == '' || valueInput.value.match(ACCEPTABLE_VALUE_REGEX))
            valueInput.className = 'valueInput';
        else
            valueInput.className = 'incorrectField';
    }, false);
    valueCell.appendChild(valueInput);
    // -----------
    let instructionSelect = document.createElement('select');
    instructionSelect.className = 'instructionSelect';

    for (let str of INSTRUCTIONS) {
        let option = document.createElement('option');
        option.value = str;
        option.innerText = str;
        instructionSelect.appendChild(option);
    }

    instructionCell.appendChild(instructionSelect);
    // -------------
    let b = document.createElement('button');
    b.innerText = '-';
    b.addEventListener('click', function () {
        tbody.removeChild(row);
    }, false);
    deleteCell.appendChild(b);
    // -------------
    row.appendChild(labelCell);
    row.appendChild(instructionCell);
    row.appendChild(valueCell);
    row.appendChild(deleteCell);
    tbody.appendChild(row);
}, false);