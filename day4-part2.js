const input1 = 108457;
const input2 = 562041;

countPossibilities = () => {
    
    let count = 0;
    
    for (let i = input1; i <= input2; i++) {
        const digits = '' + i;
        const pos6 = parseInt(digits[5]);
        const pos5 = parseInt(digits[4]);
        const pos4 = parseInt(digits[3]);
        const pos3 = parseInt(digits[2]);
        const pos2 = parseInt(digits[1]);
        const pos1 = parseInt(digits[0]);

        if ((pos6 === pos5 && pos5 !== pos4) || 
            (pos5 === pos4 && pos6 !== pos5 && pos4 !== pos3) || 
            (pos4 === pos3 && pos5 !== pos4 && pos3 !== pos2) ||
            (pos3 === pos2 && pos4 !== pos3 && pos2 !== pos1) ||
            (pos2 === pos1 && pos3 !== pos2)) {
            if (pos6 >= pos5) {
                if (pos5 >= pos4) {
                    if (pos4 >= pos3) {
                        if (pos3 >= pos2) {
                            if (pos2 >= pos1) {
                                count++;
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(count);
}

countPossibilities();