function sum(a,b){
return a + b
}

function substract (a,b){
    return a - b
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// create a function for multply

