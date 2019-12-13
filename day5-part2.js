const getParam = (opCodeString, paramNo) => {
    const indexToLookFor = opCodeString.length - (paramNo + 2);
    const existingIndex = indexToLookFor > -1;
    return existingIndex ? parseInt(opCodeString[indexToLookFor]) : 0;
};

const compute = () => {
    const input = [3,225,1,225,6,6,1100,1,238,225,104,0,1002,114,19,224,1001,224,-646,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1101,40,62,225,1101,60,38,225,1101,30,29,225,2,195,148,224,1001,224,-40,224,4,224,1002,223,8,223,101,2,224,224,1,224,223,223,1001,143,40,224,101,-125,224,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,101,29,139,224,1001,224,-99,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1101,14,34,225,102,57,39,224,101,-3420,224,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1101,70,40,225,1102,85,69,225,1102,94,5,225,1,36,43,224,101,-92,224,224,4,224,1002,223,8,223,101,1,224,224,1,224,223,223,1102,94,24,224,1001,224,-2256,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1102,8,13,225,1101,36,65,224,1001,224,-101,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,8,677,226,224,1002,223,2,223,1006,224,329,1001,223,1,223,1108,226,226,224,1002,223,2,223,1005,224,344,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,359,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,374,101,1,223,223,1107,226,226,224,1002,223,2,223,1005,224,389,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,404,101,1,223,223,1008,226,226,224,1002,223,2,223,1006,224,419,101,1,223,223,108,677,226,224,1002,223,2,223,1006,224,434,101,1,223,223,1108,677,226,224,102,2,223,223,1005,224,449,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,464,1001,223,1,223,108,677,677,224,102,2,223,223,1005,224,479,101,1,223,223,7,677,677,224,102,2,223,223,1005,224,494,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,509,101,1,223,223,107,677,226,224,1002,223,2,223,1005,224,524,1001,223,1,223,7,677,226,224,1002,223,2,223,1005,224,539,1001,223,1,223,1007,226,677,224,1002,223,2,223,1005,224,554,1001,223,1,223,8,677,677,224,102,2,223,223,1006,224,569,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,584,1001,223,1,223,1008,677,677,224,102,2,223,223,1005,224,599,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,614,101,1,223,223,1107,677,226,224,1002,223,2,223,1006,224,629,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,644,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,659,1001,223,1,223,108,226,226,224,102,2,223,223,1006,224,674,101,1,223,223,4,223,99,226];
    const inputInstruction = 5;
    let count = 0;

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
        let output;
        
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
                    console.log('333333333333')
                    valuesInInstruction = 2;
                    indexStore = input[count + 1];
                    input[indexStore] = inputInstruction;
                    count += valuesInInstruction;
                    break;
                case 4:
                    const indexOutput = input[count + 1];
                    valuesInInstruction = 2;
                    output = input[indexOutput];
                    console.log('output!', output);
                    count += valuesInInstruction;
                    break;
                case 5:
                    indexParameter1 = input[count + 1];
                    indexParameter2 = input[count + 2];
                    value1 = !!parameter1Mode ? indexParameter1 : input[indexParameter1];
                    value2 = !!parameter2Mode ? indexParameter2 : input[indexParameter2];
                    
                    console.log(value1, typeof value1);
                    
                    if (value1 !== 0) {
                        console.log('opCodeString: ', opCodeString, 'index1: ', indexParameter1, ', mode1: ', parameter1Mode, ', value1: ', value1, 'index2: ', indexParameter2, ', mode2: ', parameter2Mode, ', value2: ', value2);
                        valuesInInstruction = value2;
                        count = valuesInInstruction;
                    } else {
                        console.log('5, zero, defaults to 3', );
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
}

compute();
