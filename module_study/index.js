const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str){
    if (str.length % 2){
        return odd;
    }
    return even;

}

console.log(checkStringOddOrEven("hello"));