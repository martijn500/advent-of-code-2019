let machineA;
let machineB;
let machineC;
let machineD;
let machineE;

const getParam = (opCodeString, paramNo) => {
    const indexToLookFor = opCodeString.length - (paramNo + 2);
    const existingIndex = indexToLookFor > -1;
    return existingIndex ? parseInt(opCodeString[indexToLookFor]) : 0;
};

const resetInput = (possibility) => {
    const input = [3,8,1001,8,10,8,105,1,0,0,21,42,67,88,105,114,195,276,357,438,99999,3,9,101,4,9,9,102,3,9,9,1001,9,2,9,102,4,9,9,4,9,99,3,9,1001,9,4,9,102,4,9,9,101,2,9,9,1002,9,5,9,1001,9,2,9,4,9,99,3,9,1001,9,4,9,1002,9,4,9,101,2,9,9,1002,9,2,9,4,9,99,3,9,101,4,9,9,102,3,9,9,1001,9,5,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99];

    machineA = {
        input: [...input],
        initialized: false,
        phaseSetting: possibility[0],
        state: 'on',
        output: 0,
        count: 0
    };

    machineB = {...machineA, phaseSetting: possibility[1]};
    machineC = {...machineA, phaseSetting: possibility[2]};
    machineD = {...machineA, phaseSetting: possibility[3]};
    machineE = {...machineA, phaseSetting: possibility[4]};
}

const amplify = (machine, inputInstruction) => {
    let count = machine.count;
    let input = machine.input;

    for (i = count; i < input.length; i++) {
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
            machine.state = 'off';
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
                    if (!machine.initialized) {
                        input[indexStore] = machine.phaseSetting;
                        machine.initialized = true;
                    } else {
                        input[indexStore] = inputInstruction;
                    }
                    count += valuesInInstruction;
                    break;
                case 4:
                    const indexOutput = input[count + 1];
                    valuesInInstruction = 2;
                    machine.output = input[indexOutput];
                    count += valuesInInstruction;

                    machine.count = count;
                    machine.input = input;
                    return machine.output;
                case 5:
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                                        
                    if (value1 !== 0) {
                        valuesInInstruction = value2;
                        count = valuesInInstruction;
                    } else {
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
            }
            machine.count = count;
            machine.input = input;

        }
    };
}

phasePossibilities = [
    [5,6,7,8,9],
    [5,6,7,9,8],
    [5,6,8,9,7],
    [5,6,8,7,9],
    [5,6,9,7,8],
    [5,6,9,8,7],
    [5,7,6,8,9],
    [5,7,6,9,8],
    [5,7,8,9,6],
    [5,7,8,6,9],
    [5,7,9,6,8],
    [5,7,9,8,6],
    [5,8,6,7,9],
    [5,8,7,6,9],
    [5,8,7,9,6],
    [5,8,6,9,7],
    [5,8,9,6,7],
    [5,8,9,7,6],
    [5,9,6,8,7],
    [5,9,8,6,7],
    [5,9,8,7,6],
    [5,9,6,7,8],
    [5,9,7,6,8],
    [5,9,7,8,6],

    [6,5,7,8,9],
    [6,5,7,9,8],
    [6,5,8,9,7],
    [6,5,8,7,9],
    [6,5,9,7,8],
    [6,5,9,8,7],
    [6,7,5,8,9],
    [6,7,5,9,8],
    [6,7,8,9,5],
    [6,7,8,5,9],
    [6,7,9,5,8],
    [6,7,9,8,5],
    [6,8,5,7,9],
    [6,8,7,5,9],
    [6,8,7,9,5],
    [6,8,5,9,7],
    [6,8,9,5,7],
    [6,8,9,7,5],
    [6,9,5,8,7],
    [6,9,8,5,7],
    [6,9,8,7,5],
    [6,9,5,7,8],
    [6,9,7,5,8],
    [6,9,7,8,5],

    [7,5,6,8,9],
    [7,5,6,9,8],
    [7,5,8,9,6],
    [7,5,8,6,9],
    [7,5,9,6,8],
    [7,5,9,8,6],
    [7,6,5,8,9],
    [7,6,5,9,8],
    [7,6,8,9,5],
    [7,6,8,5,9],
    [7,6,9,5,8],
    [7,6,9,8,5],
    [7,8,5,6,9],
    [7,8,6,5,9],
    [7,8,6,9,5],
    [7,8,5,9,6],
    [7,8,9,5,6],
    [7,8,9,6,5],
    [7,9,5,8,6],
    [7,9,8,5,6],
    [7,9,8,6,5],
    [7,9,5,6,8],
    [7,9,6,5,8],
    [7,9,6,8,5],

    [8,5,6,7,9],
    [8,5,6,9,7],
    [8,5,7,9,6],
    [8,5,7,6,9],
    [8,5,9,6,7],
    [8,5,9,7,6],
    [8,6,5,7,9],
    [8,6,5,9,7],
    [8,6,7,9,5],
    [8,6,7,5,9],
    [8,6,9,5,7],
    [8,6,9,7,5],
    [8,7,5,6,9],
    [8,7,6,5,9],
    [8,7,6,9,5],
    [8,7,5,9,6],
    [8,7,9,5,6],
    [8,7,9,6,5],
    [8,9,5,7,6],
    [8,9,7,5,6],
    [8,9,7,6,5],
    [8,9,5,6,7],
    [8,9,6,5,7],
    [8,9,6,7,5],

    [9,5,6,7,8],
    [9,5,6,8,7],
    [9,5,7,8,6],
    [9,5,7,6,8],
    [9,5,8,6,7],
    [9,5,8,7,6],
    [9,6,5,7,8],
    [9,6,5,8,7],
    [9,6,7,8,5],
    [9,6,7,5,8],
    [9,6,8,5,7],
    [9,6,8,7,5],
    [9,7,5,6,8],
    [9,7,6,5,8],
    [9,7,6,8,5],
    [9,7,5,8,6],
    [9,7,8,5,6],
    [9,7,8,6,5],
    [9,8,5,7,6],
    [9,8,7,5,6],
    [9,8,7,6,5],
    [9,8,5,6,7],
    [9,8,6,5,7],
    [9,8,6,7,5]
];

let highestOutput = 0;

const loopAmps = () => {
    amplify(machineA, machineE.output);
    amplify(machineB, machineA.output);
    amplify(machineC, machineB.output);
    amplify(machineD, machineC.output);
    const outputE = amplify(machineE, machineD.output);

    if (outputE > highestOutput) highestOutput = outputE;
}

phasePossibilities.forEach(possibility => {
    resetInput(possibility);
    while(machineE.state !== 'off') {
        loopAmps();
    }
});

console.log('final output: ', highestOutput);
