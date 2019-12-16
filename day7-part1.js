const getParam = (opCodeString, paramNo) => {
    const indexToLookFor = opCodeString.length - (paramNo + 2);
    const existingIndex = indexToLookFor > -1;
    return existingIndex ? parseInt(opCodeString[indexToLookFor]) : 0;
};

let input;
const resetInput = () => {
    input = [3,8,1001,8,10,8,105,1,0,0,21,42,67,88,105,114,195,276,357,438,99999,3,9,101,4,9,9,102,3,9,9,1001,9,2,9,102,4,9,9,4,9,99,3,9,1001,9,4,9,102,4,9,9,101,2,9,9,1002,9,5,9,1001,9,2,9,4,9,99,3,9,1001,9,4,9,1002,9,4,9,101,2,9,9,1002,9,2,9,4,9,99,3,9,101,4,9,9,102,3,9,9,1001,9,5,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99];
}

const compute = (phaseSetting, inputInstruction) => {
    let count = 0;
    let output;
    let phaseSet = false;
    input.forEach(() => {
        let opCode = input[count];
        const opCodeString = '' + opCode;
        if (opCodeString.length > 1) {
            opCode = parseInt(opCodeString.substr(opCodeString.length - 2, 2));
        }
        const parameter1Mode = getParam(opCodeString, 1); // 0 = position / 1 = immediate
        const parameter2Mode = getParam(opCodeString, 2);

        let valuesInInstruction;
        let indexParameter1;
        let indexParameter2;
        let indexStore;
        let value1;
        let value2;
        
        if (opCode === 99) {
            return;
        } else {
            switch(opCode) {
                case 1:
                case 2:
                    valuesInInstruction = 4;
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    indexStore = input[count + 3];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                    
                    if (opCode === 1) {
                        input[indexStore] = value1 + value2;
                    } else if (opCode === 2) {
                        input[indexStore] = value1 * value2;
                    }
                    count += valuesInInstruction;
                    break;
                
                case 3:
                    valuesInInstruction = 2;
                    indexStore = input[count + 1];
                    if (!phaseSet) {
                        input[indexStore] = phaseSetting;
                        phaseSet = true;
                    } else {
                        input[indexStore] = inputInstruction;
                    }
                    count += valuesInInstruction;
                    break;
                case 4:
                    const indexOutput = input[count + 1];
                    valuesInInstruction = 2;
                    output = input[indexOutput];
                    count += valuesInInstruction;
                    break;
                case 5:
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                                        
                    if (value1 !== 0) {
                        // console.log('opCodeString: ', opCodeString, 'index1: ', indexParameter1, ', mode1: ', parameter1Mode, ', value1: ', value1, 'index2: ', indexParameter2, ', mode2: ', parameter2Mode, ', value2: ', value2);
                        valuesInInstruction = value2;
                        count = valuesInInstruction;
                    } else {
                        // console.log('5, zero, defaults to 3', );
                        valuesInInstruction = 3;
                        count += valuesInInstruction;
                    }
                    break;
                case 6:
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                    if (value1 === 0) {
                        valuesInInstruction = value2;
                        count = valuesInInstruction;
                    } else {
                        valuesInInstruction = 3;
                        count += valuesInInstruction;
                    }
                    break;
                case 7:
                    valuesInInstruction = 4;
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    indexStore = input[count + 3];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                    if (value1 < value2) {
                        input[indexStore] = 1;
                    } else {
                        input[indexStore] = 0;
                    }
                    count += valuesInInstruction;
                    break;
                case 8:
                    valuesInInstruction = 4;
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    indexStore = input[count + 3];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                    if (value1 === value2) {
                        input[indexStore] = 1;
                    } else {
                        input[indexStore] = 0;
                    }
                    count += valuesInInstruction;
                    break;
                case 99:
                    return;
            }
        }
    });
    return output;
}

phasePossibilities = [
    [0,1,2,3,4],
    [0,1,2,4,3],
    [0,1,3,4,2],
    [0,1,3,2,4],
    [0,1,4,2,3],
    [0,1,4,3,2],
    [0,2,1,3,4],
    [0,2,1,4,3],
    [0,2,3,4,1],
    [0,2,3,1,4],
    [0,2,4,1,3],
    [0,2,4,3,1],
    [0,3,1,2,4],
    [0,3,2,1,4],
    [0,3,2,4,1],
    [0,3,1,4,2],
    [0,3,4,1,2],
    [0,3,4,2,1],
    [0,4,1,3,2],
    [0,4,3,1,2],
    [0,4,3,2,1],
    [0,4,1,2,3],
    [0,4,2,1,3],
    [0,4,2,3,1],

    [1,0,2,3,4],
    [1,0,2,4,3],
    [1,0,3,4,2],
    [1,0,3,2,4],
    [1,0,4,2,3],
    [1,0,4,3,2],
    [1,2,0,3,4],
    [1,2,0,4,3],
    [1,2,3,4,0],
    [1,2,3,0,4],
    [1,2,4,0,3],
    [1,2,4,3,0],
    [1,3,0,2,4],
    [1,3,2,0,4],
    [1,3,2,4,0],
    [1,3,0,4,2],
    [1,3,4,0,2],
    [1,3,4,2,0],
    [1,4,0,3,2],
    [1,4,3,0,2],
    [1,4,3,2,0],
    [1,4,0,2,3],
    [1,4,2,0,3],
    [1,4,2,3,0],

    [2,0,1,3,4],
    [2,0,1,4,3],
    [2,0,3,4,1],
    [2,0,3,1,4],
    [2,0,4,1,3],
    [2,0,4,3,1],
    [2,1,0,3,4],
    [2,1,0,4,3],
    [2,1,3,4,0],
    [2,1,3,0,4],
    [2,1,4,0,3],
    [2,1,4,3,0],
    [2,3,0,1,4],
    [2,3,1,0,4],
    [2,3,1,4,0],
    [2,3,0,4,1],
    [2,3,4,0,1],
    [2,3,4,1,0],
    [2,4,0,3,1],
    [2,4,3,0,1],
    [2,4,3,1,0],
    [2,4,0,1,3],
    [2,4,1,0,3],
    [2,4,1,3,0],

    [3,0,1,2,4],
    [3,0,1,4,2],
    [3,0,2,4,1],
    [3,0,2,1,4],
    [3,0,4,1,2],
    [3,0,4,2,1],
    [3,1,0,2,4],
    [3,1,0,4,2],
    [3,1,2,4,0],
    [3,1,2,0,4],
    [3,1,4,0,2],
    [3,1,4,2,0],
    [3,2,0,1,4],
    [3,2,1,0,4],
    [3,2,1,4,0],
    [3,2,0,4,1],
    [3,2,4,0,1],
    [3,2,4,1,0],
    [3,4,0,2,1],
    [3,4,2,0,1],
    [3,4,2,1,0],
    [3,4,0,1,2],
    [3,4,1,0,2],
    [3,4,1,2,0],

    [4,0,1,2,3],
    [4,0,1,3,2],
    [4,0,2,3,1],
    [4,0,2,1,3],
    [4,0,3,1,2],
    [4,0,3,2,1],
    [4,1,0,2,3],
    [4,1,0,3,2],
    [4,1,2,3,0],
    [4,1,2,0,3],
    [4,1,3,0,2],
    [4,1,3,2,0],
    [4,2,0,1,3],
    [4,2,1,0,3],
    [4,2,1,3,0],
    [4,2,0,3,1],
    [4,2,3,0,1],
    [4,2,3,1,0],
    [4,3,0,2,1],
    [4,3,2,0,1],
    [4,3,2,1,0],
    [4,3,0,1,2],
    [4,3,1,0,2],
    [4,3,1,2,0]
];

highestOutput = 0;
phasePossibilities.forEach(possibility => {
    resetInput();
    outputA = compute(possibility[0], 0);
    outputB = compute(possibility[1], outputA);
    outputC = compute(possibility[2], outputB);
    outputD = compute(possibility[3], outputC);
    outputE = compute(possibility[4], outputD);
    
    if (outputE > highestOutput) highestOutput = outputE;
});
console.log('final output: ', highestOutput);
