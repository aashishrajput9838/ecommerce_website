// Models/NumberModel.js

class NumberModel {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    // Validate if both numbers are valid
    isValid() {
        return typeof this.a === 'number' && typeof this.b === 'number' && 
               !isNaN(this.a) && !isNaN(this.b);
    }

    // Get the numbers as an object
    getNumbers() {
        return {
            a: this.a,
            b: this.b
        };
    }
}

module.exports = NumberModel; 