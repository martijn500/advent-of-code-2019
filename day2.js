let input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,10,19,23,1,6,23,27,1,5,27,31,1,10,31,35,2,10,35,39,1,39,5,43,2,43,6,47,2,9,47,51,1,51,5,55,1,5,55,59,2,10,59,63,1,5,63,67,1,67,10,71,2,6,71,75,2,6,75,79,1,5,79,83,2,6,83,87,2,13,87,91,1,91,6,95,2,13,95,99,1,99,5,103,2,103,10,107,1,9,107,111,1,111,6,115,1,115,2,119,1,119,10,0,99,2,14,0,0];
let inputEditable;
const nounPosition = 1;
const verbPosition = 2;

const resetInput = () => {
    inputEditable = [...input];
}
const compute = (input) => {
    const instructionPointer = 0;
    const valuesInInstruction = 4;
    const index0ValueToLookFor = 19690720;
    let count = 0;

    input.forEach(() => {
        if (count % valuesInInstruction === instructionPointer) {
            const opCode = input[count];
            const value1Index = input[count + 1];
            const value2Index = input[count + 2];
            const changeIndex = input[count + 3];
            const value1 = input[value1Index];
            const value2 = input[value2Index];
            
            if (opCode === 1) {
                input[changeIndex] = value1 + value2;
            } else if (opCode === 2) {
                input[changeIndex] = value1 * value2;
            } else if (opCode === 99) {
                return;
            }
        }
        count++;
    });
    
    if (input[0] === index0ValueToLookFor) {
        const noun = input[nounPosition];
        const verb = input[verbPosition];
        console.log(100 * noun + verb);
    }
}

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        resetInput();
        inputEditable[nounPosition] = i;
        inputEditable[verbPosition] = j;
        compute(inputEditable);
    }
}
