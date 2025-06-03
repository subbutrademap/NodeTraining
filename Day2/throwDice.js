//throw dice

let diceValue = Math.random() * 6;
diceValue = parseInt(diceValue);
console.log(diceValue);




const output = {
    "1" : 0,
    "2" : 0,
    "3" : 0,
    "4" : 0,
    "5" : 0,
    "6" : 0,
}

for (let i = 1 ;i<=100;i++) {
    const result = throwDice();
    output[result] = output[result] + 1;
}

let maxOccurance = 1;

for (i=2;i<=6;i++) {
    if (output[i] > output[maxOccurance]) {
        maxOccurance = i;
    }
}
console.log(maxOccurance);
console.log(output);




function throwDice() {

    return parseInt((Math.random()*6) + 1);
}


