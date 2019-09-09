const linePattern = /^\s*(?:(\w+):\s+)?([A-Za-z]+)(?:\s+([=^\-\w]+))?(?:\s+#\s*(.*))?\s*$/g;

function loadFromString(str) {
    const nullstr = s => s ? s : '';
    let lines = str.split('\n').filter(x => !x.match(/^\s*$/g));

    if (lines.length <= 0)
        throw 'Pusty plik.'

    let addRowBtn = document.getElementById('addProgramRowButton'),
        objs = lines.map(line => {
            let matches = line.matchAll(linePattern).next().value;

            if (matches == undefined)
                throw 'Kodem źródłowy jest uszkodzony.';

            return {
                label: nullstr(matches[1]),
                instruction: matches[2] ? matches[2].toLowerCase() : '',
                argument: nullstr(matches[3]),
                comment: nullstr(matches[4])
            };
        });

    let indexingTable = new Map();
    for (let i = 0; i < INSTRUCTIONS.length; ++i)
        indexingTable.set(INSTRUCTIONS[i], i);

    for (let obj of objs) {
        if (!indexingTable.has(obj.instruction))
            throw 'Nieznana instrukcja: ' + obj.instruction;;
    }

    document.getElementById('programTableBody').innerHTML = '';
    lines.forEach(() => addRowBtn.click());

    let labelInputs = document.getElementsByClassName('labelInput'),
        instructionSelects = document.getElementsByClassName('instructionSelect'),
        valueInputs = document.getElementsByClassName('valueInput'),
        commentInputs = document.getElementsByClassName('commentInput');

    for (let i = 0; i < objs.length; ++i) {
        labelInputs[i].value = objs[i].label;
        instructionSelects[i].selectedIndex = indexingTable.get(objs[i].instruction);
        valueInputs[i].value = objs[i].argument;
        commentInputs[i].value = objs[i].comment;
    }
}