// Validators/numberValidator.js

const NumberModel = require('../Models/NumberModel');

class NumberValidator {
    // Validate input data for addition
    static validateAddition(data) {
        const { a, b } = data;
        
        // Check if both numbers exist
        if (a === undefined || b === undefined) {
            return {
                isValid: false,
                error: 'Both numbers (a and b) are required'
            };
        }

        // Convert to numbers and check if they're valid
        const numA = Number(a);
        const numB = Number(b);

        if (isNaN(numA) || isNaN(numB)) {
            return {
                isValid: false,
                error: 'Both values must be valid numbers'
            };
        }

        // Create and validate the model
        const numberModel = new NumberModel(numA, numB);
        
        if (!numberModel.isValid()) {
            return {
                isValid: false,
                error: 'Invalid number format'
            };
        }

        return {
            isValid: true,
            data: numberModel.getNumbers()
        };
    }
}

module.exports = NumberValidator; 