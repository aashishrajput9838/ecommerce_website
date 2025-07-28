// Services/mathService.js

const NumberValidator = require('../Validators/numberValidator');

class MathService {
    // Add function for mathematical operations
    static add(a, b) {
        try {
            // Validate input using the validator
            const validation = NumberValidator.validateAddition({ a, b });
            
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            const { data } = validation;
            const result = data.a + data.b;
            
            // Log the operation for debugging
            console.log(`MathService: Adding ${data.a} + ${data.b} = ${result}`);
            
            return result;
        } catch (error) {
            console.error('MathService Error:', error.message);
            throw error;
        }
    }

    // Additional mathematical operations can be added here
    static subtract(a, b) {
        const validation = NumberValidator.validateAddition({ a, b });
        if (!validation.isValid) {
            throw new Error(validation.error);
        }
        const { data } = validation;
        return data.a - data.b;
    }

    static multiply(a, b) {
        const validation = NumberValidator.validateAddition({ a, b });
        if (!validation.isValid) {
            throw new Error(validation.error);
        }
        const { data } = validation;
        return data.a * data.b;
    }
}

module.exports = MathService; 