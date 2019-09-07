const linePattern = /^\s*(?:(\w+):\s+)?([A-Za-z]+)(?:\s+([=^\-\w]+))?(?:\s+#\s*(.*))?\s*$/g;

function loadFromString(str) {
    const nullstr = s => s ? s : '';
    let lines = str.split('\n').filter(x => !x.match(/^\s*$/g)),
        addRowBtn = document.getElementById('addProgramRowButton'),
        objs = lines.map(line => {
            let matches = line.matchAll(linePattern).next().value;

            if (matches == undefined)
                throw 'Plik z kodem źródłowym jest uszkodzony.';

            return {
                label: nullstr(matches[1]),
                instruction: matches[2] ? matches[2].toLowerCase() : '',
                argument: nullstr(matches[3]),
                comment: nullstr(matches[4])
            };
        });

    document.getElementById('programTableBody').innerHTML = '';
    lines.forEach(() => addRowBtn.click());
    let labelInputs = document.getElementsByClassName('labelInput'),
        instructionSelects = document.getElementsByClassName('instructionSelect'),
        valueInputs = document.getElementsByClassName('valueInput'),
        commentInputs = document.getElementsByClassName('commentInput'),
        indexingTable = new Map();

    for (let i = 0; i < INSTRUCTIONS.length; ++i)
        indexingTable.set(INSTRUCTIONS[i], i);

    for (let i = 0; i < objs.length; ++i) {
        labelInputs[i].value = objs[i].label;
        let j = indexingTable.get(objs[i].instruction);

        if (j == undefined)
            throw 'No such instruction: ' + objs[i].instruction;

        instructionSelects[i].selectedIndex = j;
        valueInputs[i].value = objs[i].argument;
        commentInputs[i].value = objs[i].comment;
    }
}