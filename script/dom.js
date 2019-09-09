const ACCEPTABLE_VALUE_REGEX = /^([=^]?)(-?\d+)$/g;
const ACCEPTABLE_LABEL_REGEX = /^[\dA-Z_]+$/g;

function refreshMemory() {
    let addresses = document.getElementsByClassName('memoryIndexCell'),
        values = document.getElementsByClassName('memoryValueCell');

    if (addresses.length != values.length) {
        alert("FATAL ERROR");
        console.error(addresses.length, values.length);
        return;
    }

    for (let i = 0, j, m; i < MEMORY_TABLE_LENGTH; ++i) {
        j = i + memoryScrollAmount;
        m = memory.get(j);
        addresses[i].innerText = j;
        values[i].innerText = m ? m : '??';
    }
}

document.getElementById('addProgramRowButton').addEventListener('click', function () {
    let tbody = document.getElementById('programTableBody'),
        row = document.createElement('tr'),
        labelCell = document.createElement('td'),
        instructionCell = document.createElement('td'),
        valueCell = document.createElement('td'),
        commentCell = document.createElement('td'),
        deleteCell = document.createElement('td');

    labelCell.className = 'labelCell';
    instructionCell.className = 'instructionCell';
    valueCell.className = 'valueCell';
    commentCell.className = 'commentCell';
    // -----------
    let labelInput = document.createElement('input');
    labelInput.className = 'labelInput';
    labelInput.addEventListener('input', function () {
        if (labelInput.value == '' || labelInput.value.match(ACCEPTABLE_LABEL_REGEX))
            labelInput.className = 'labelInput';
        else
            labelInput.className = 'incorrectField';
    }, false);
    labelCell.appendChild(labelInput);

    let valueInput = document.createElement('input');
    valueInput.className = 'valueInput';
    valueInput.addEventListener('input', function () {
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
    let commentInput = document.createElement('input');
    commentInput.className = 'commentInput';
    commentCell.appendChild(commentInput);
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
    row.appendChild(commentCell);
    row.appendChild(deleteCell);
    tbody.appendChild(row);
}, false);

document.getElementById('scrollMemoryButtonDown').addEventListener('click', function () {
    memoryScrollAmount++;
    refreshMemory();
    document.getElementById('scrollMemoryButtonUp').parentNode.style.display = memoryScrollAmount > 0 ? '' : 'none';
}, false);

document.getElementById('scrollMemoryButtonUp').addEventListener('click', function (ev) {
    memoryScrollAmount--;

    if (memoryScrollAmount < 1) {
        memoryScrollAmount = 0;
        ev.target.parentNode.style.display = 'none';
    }

    refreshMemory();
}, false);

document.getElementById('fileReadButton').addEventListener('click', function (ev) {
    document.getElementById('stringImportDiv').style.display = '';
    ev.target.parentNode.parentNode.style.display = 'none';
}, false);

document.getElementById('stringImportConfirmButton').addEventListener('click', function (ev) {
    document.getElementById('fileReadWriteDiv').style.display = '';
    ev.target.parentNode.style.display = 'none';
}, false);